const moment = require("moment");
const crypto = require("crypto");
const querystring = require("qs");
const { Order } = require("../model/model");
const tmnCode = "F1I9CX1U";  // Mã TMN của bạn
const secretKey = "LERNB4N4HGL1K59T6QP03Y2TR55VSITH";  // Khóa bí mật của bạn
const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";  // Địa chỉ VNPay
const returnUrl = "http://localhost:3000/resultPaymentPage";  // URL trả về sau khi thanh toán

const paymentController = {
    createPaymentUrl: async (req, res) => {
        try {
            const newOrder = new Order(req.body.dataOrder);
            const saveOrder = await newOrder.save();
            try {
                process.env.TZ = "Asia/Ho_Chi_Minh";
                let date = new Date();
                let createDate = moment(date).format("YYYYMMDDHHmmss");
                let ipAddr =
                    req.headers["x-forwarded-for"] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;
                let paymentUrl = vnpUrl;
                // Lấy thông tin đơn hàng từ body request
                let orderId = saveOrder._id;
                let amount = req.body.amount;
                let locale = "vn"; // Mặc định là 'vn'
                let currCode = "VND";
                // Cấu hình tham số cho VNPay
                let vnp_Params = {};
                vnp_Params["vnp_Version"] = "2.1.0";
                vnp_Params["vnp_Command"] = "pay";
                vnp_Params["vnp_TmnCode"] = tmnCode;
                vnp_Params["vnp_Locale"] = locale;
                vnp_Params["vnp_CurrCode"] = currCode;
                vnp_Params["vnp_TxnRef"] = orderId; // Mã đơn hàng
                vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId; // Thông tin đơn hàng
                vnp_Params["vnp_OrderType"] = "other"; // Loại giao dịch
                vnp_Params["vnp_Amount"] = amount * 100; // Số tiền cần thanh toán (VNPay yêu cầu tính theo đồng)
                vnp_Params["vnp_ReturnUrl"] = returnUrl; // URL trả về sau khi thanh toán
                vnp_Params["vnp_IpAddr"] = ipAddr; // Địa chỉ IP của khách hàng
                vnp_Params["vnp_CreateDate"] = createDate; // Ngày tạo yêu cầu
                // Sắp xếp các tham số theo thứ tự để tạo URL chính xác
                vnp_Params = sortObject(vnp_Params);
                // Tạo chuỗi dữ liệu cần ký
                let signData = querystring.stringify(vnp_Params, { encode: false });
                let hmac = crypto.createHmac("sha512", secretKey);
                let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
                // Thêm chữ ký bảo mật vào các tham số
                vnp_Params["vnp_SecureHash"] = signed;
                // Tạo URL thanh toán
                paymentUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
                // Trả về URL thanh toán cho client
                res.json({
                    EC: 0,  // Mã trạng thái thành công
                    MS: "success",  // Thông báo thành công
                    paymentUrl: paymentUrl,  // URL thanh toán VNPay
                    vnp_ReturnUrl: vnp_Params["vnp_ReturnUrl"]
                });
            } catch (error) {
                res.status(500).json({
                    EC: 1,  // Mã trạng thái lỗi
                    MS: "Error creating payment URL",  // Thông báo lỗi
                    error: error.message  // Thông tin chi tiết lỗi
                });
            }
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Add Order error!", err }); //HTTP REQUEST CODE
        }

    },
    handleReturn: async (req, res) => {
        try {
            const vnpParams = req.query;  // Lấy dữ liệu trả về từ URL
            const secureHash = vnpParams["vnp_SecureHash"];
            delete vnpParams["vnp_SecureHash"];
            delete vnpParams["vnp_SecureHashType"];

            // Xác thực chữ ký
            const sortedParams = sortObject(vnpParams);
            let signData = "";
            for (const key in sortedParams) {
                if (sortedParams[key] != null && sortedParams[key] !== "") {
                    signData += key + "=" + sortedParams[key] + "&";
                }
            }

            // Cắt bỏ dấu "&" cuối cùng
            signData = signData.slice(0, -1);

            // Tạo chữ ký HMAC SHA-512
            const hmac = crypto.createHmac("sha512", "LERNB4N4HGL1K59T6QP03Y2TR55VSITH");
            const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

            // Kiểm tra chữ ký
            if (secureHash === signed) {
                if (vnpParams["vnp_ResponseCode"] === "00") {
                    // Lưu trạng thái đơn hàng thành công
                    await Order.findByIdAndUpdate(vnpParams["vnp_TxnRef"], { status: "Paid" });
                    res.json({ message: "Payment successful" });
                } else {
                    res.json({ message: "Payment failed", code: vnpParams["vnp_ResponseCode"] });
                }
            } else {
                res.status(400).json({ message: "Invalid signature" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error handling payment return", error });
        }
    },
};

// Hàm hỗ trợ sắp xếp các tham số theo thứ tự
function sortObject(obj) {
    const sorted = {};
    const str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = paymentController;