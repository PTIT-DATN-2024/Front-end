// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { User } = require("../model/model"); // Điều chỉnh đường dẫn theo đúng file model của bạn

exports.protectOnlyAdmin = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ message: "Không có token, không được ủy quyền" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        if (user.role !== "ADMIN" ) {
            return res.status(403).json({ message: "Không có quyền cập nhật profile này" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token không hợp lệ" });
    }
};
exports.protectOnlyAdmin = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ message: "Không có token, không được ủy quyền" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        if (user.role !== "ADMIN" ) {
            return res.status(403).json({ message: "Không có quyền cập nhật profile này" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token không hợp lệ" });
    }
};

exports.protectOwnerAdmin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ message: "Không có token, không được ủy quyền" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        if (user.role !== "ADMIN" && user._id.toString() !== req.params.id) {
            return res.status(403).json({ message: "Không có quyền cập nhật profile này" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token không hợp lệ" });
    }
};

