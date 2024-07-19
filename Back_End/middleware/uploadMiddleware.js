const multer = require("multer");
const path = require("path");

// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
    // Thiết lập thư mục lưu trữ file
    destination: function (req, file, cb) {
        let uploadPath;
        // Kiểm tra đường dẫn cơ sở của yêu cầu để xác định loại thực thể (user hoặc product)
        if (req.entityType === "user") {
            uploadPath = "uploads/users/";
        } else if (req.entityType === "product") {
            uploadPath = "uploads/products/";
        } else if (req.entityType === "category") {
            uploadPath = "uploads/categories/";
        } else {
            // Xử lý trường hợp không xác định được uploadPath
            uploadPath = "uploads/";
        }
        cb(null, uploadPath); // Gọi callback với đường dẫn thư mục lưu trữ
    },
    // Thiết lập tên file khi lưu trữ
    filename: function (req, file, cb) {
        // Đặt tên file dựa trên thời gian hiện tại và đuôi file gốc
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
