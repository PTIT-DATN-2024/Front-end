const multer = require("multer");
const path = require("path");

// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath;
        if (req.entityType === "user") {
            uploadPath = "uploads/users/";
        } else if (req.entityType === "product") {
            uploadPath = "uploads/products/";
        } else if (req.entityType === "category") {
            uploadPath = "uploads/categories/";
        } else {
            uploadPath = "uploads/";
        }
        cb(null, uploadPath); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });
module.exports = upload;
