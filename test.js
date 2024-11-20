const { Order } = require("../model/model");
const crypto = require("crypto");
const querystring = require("qs");
const moment = require("moment-timezone"); // Cài đặt moment-timezone

const tmnCode = "F1I9CX1U";
const secretKey = "LERNB4N4HGL1K59T6QP03Y2TR55VSITH";
const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const returnUrl = "http://localhost:3000";

const paymentController = {
    // Tạo URL thanh toán
    createPayment: async (req, res) => {
        try {
            const { amount, orderInfo } = req.body; // Chỉ nhận số tiền và thông tin đơn hàng
            const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

            // Tự động tạo mã giao dịch
            const transactionRef = `ORDER_${Date.now()}`;

            // Lấy thời gian hiện tại theo múi giờ UTC+7
            const createDate = moment().tz("Asia/Ho_Chi_Minh").format("YYYYMMDDHHmmss"); // vnp_CreateDate

            // Thêm 10 phút vào thời gian tạo giao dịch để tính thời gian hết hạn (vnp_ExpireDate)
            const expireDate = moment(createDate, "YYYYMMDDHHmmss").add(10, 'minutes').format("YYYYMMDDHHmmss"); // vnp_ExpireDate

            let vnpParams = {
                vnp_Version: "2.1.0",
                vnp_Command: "pay",
                vnp_TmnCode: tmnCode,
                vnp_Amount: amount * 100, // Số tiền (VND)
                vnp_CurrCode: "VND",
                vnp_TxnRef: transactionRef, // Mã giao dịch tự động
                vnp_OrderInfo: orderInfo || "Thanh toán đơn hàng",
                vnp_OrderType: "billpayment",
                vnp_Locale: "vn",
                vnp_ReturnUrl: returnUrl,
                vnp_IpAddr: ipAddr,
                vnp_CreateDate: createDate, // Thời gian tạo giao dịch
                vnp_ExpireDate: expireDate // Thời gian hết hạn (10 phút sau)
            };

            // Sắp xếp các tham số
            vnpParams = sortObject(vnpParams);

            // Ký dữ liệu
            const signData = querystring.stringify(vnpParams, { encode: false });
            const hmac = crypto.createHmac("sha512", secretKey);
            const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
            vnpParams["vnp_SecureHash"] = signed;

            // Tạo URL thanh toán
            const paymentUrl = `${vnpUrl}?${querystring.stringify(vnpParams, { encode: false })}`;
            res.json({
                EC: 0,  // Mã trạng thái thành công
                MS: "success",  // Thông báo thành công
                paymentUrl: paymentUrl  // URL thanh toán VNPay
            });
        } catch (error) {
            res.status(500).json({
                EC: 1,  // Mã trạng thái lỗi
                MS: "Error creating payment URL",  // Thông báo lỗi
                error: error.message  // Thông tin chi tiết lỗi
            });
        }
    },
    // Xử lý kết quả trả về từ VNPay
    handleReturn: async (req, res) => {
        try {
            const vnpParams = req.query; // Lấy dữ liệu trả về từ URL
            const secureHash = vnpParams["vnp_SecureHash"];
            delete vnpParams["vnp_SecureHash"];
            delete vnpParams["vnp_SecureHashType"];

            // Xác thực chữ ký
            const sortedParams = sortObject(vnpParams);
            const signData = querystring.stringify(sortedParams, { encode: false });
            const hmac = crypto.createHmac("sha512", secretKey);
            const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

            if (secureHash === signed) {
                // Nếu giao dịch hợp lệ
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

// Hàm sắp xếp object theo thứ tự từ điển
function sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    keys.forEach((key) => {
        sorted[key] = obj[key];
    });
    return sorted;
}

module.exports = paymentController;

