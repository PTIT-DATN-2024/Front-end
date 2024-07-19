const { User, Product, Categorie, Order, Voucher } = require("../model/model");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const userController = {
    //ADD USER
    addUser: async (req, res) => {
        try {
            const { email, password, address, phoneNumber, role } = req.body;
            const avatar = req.file ? req.file.path : null; // Lấy đường dẫn của ảnh được tải lên

            const newUser = new User({
                email,
                password,
                address,
                phoneNumber,
                role,
                avatar,
            });
            const saveUser = await newUser.save();
            res.status(200).json({ EC: 0, MS: "Add user success!", saveUser });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Add user error!", err }); //HTTP REQUEST CODE
        }
    },
    //GET ALL User
    getAllUsers: async (req, res) => {
        try {
            const usersOld = await User.find();

            if (!usersOld || usersOld.length === 0) {
                return res.status(404).json({ EC: 2, MS: "Users not found!" });
            }

            const users = usersOld.map((user) => ({
                _id: user._id,
                email: user.email,
                address: user.address,
                phoneNumber: user.phoneNumber,
                role: user.role,
                avatar: user.avatar ? `/v1/uploads/users/${user.avatar.replace("uploads\\users\\", "")}` : null,
                // các trường khác của user nếu có
            }));

            res.status(200).json({ EC: 0, MS: "Get all users success!", users });
        } catch (err) {
            console.error("Get all users error:", err);
            res.status(500).json({ EC: 1, MS: "Get all users error!", err });
        }
    },

    //GET AN User
    getAnUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ EC: 1, MS: "User not found" });
            }

            const userData = {
                _id: user._id,
                email: user.email,
                address: user.address,
                phoneNumber: user.phoneNumber,
                role: user.role,
                avatar: user.avatar ? `/v1/uploads/users/${user.avatar.replace("uploads\\users\\", "")}` : null,
                // các trường khác của user nếu có
            };

            res.status(200).json({ EC: 0, MS: "Get user success!", user: userData });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Get user error!", err });
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ EC: 1, MS: "User not found" });
            }

            // Xử lý cập nhật tệp ảnh avatar nếu có
            if (req.file) {
                if (user.avatar) {
                    const avatarPath = path.join(__dirname, "..", user.avatar);

                    // Kiểm tra xem tệp cũ có tồn tại không trước khi xóa
                    if (fs.existsSync(avatarPath)) {
                        fs.unlinkSync(avatarPath); // Xóa tệp cũ từ hệ thống tệp
                    }
                }

                // Cập nhật đường dẫn tệp avatar mới
                user.avatar = req.file.path;
            }
            user.address = req.body.address || user.address;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
            user.role = req.body.sellingprroleice || user.role;

            // Cập nhật thông tin người dùng
            await user.save();

            res.status(200).json({ EC: 0, MS: "Update user success!" });
        } catch (err) {
            console.error("Update user error:", err);
            res.status(500).json({ EC: 1, MS: "Update user error!", err });
        }
    },

    //DELETE USER
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                return res.status(404).json({ EC: 1, MS: "User not found" });
            }

            // Xóa tệp avatar nếu tồn tại
            if (user.avatar) {
                let avatarPath = path.join(__dirname, "..", user.avatar);
                avatarPath = path.normalize(avatarPath); // Chuẩn hóa đường dẫn
                // Kiểm tra xem tệp có tồn tại không trước khi xóa
                if (fs.existsSync(avatarPath)) {
                    fs.unlinkSync(avatarPath); // Xóa tệp từ hệ thống tệp
                } else {
                    console.log(`File ${avatarPath} not found`);
                }
            }

            await user.remove(); // Xóa người dùng từ cơ sở dữ liệu

            res.status(200).json({ EC: 0, MS: "Delete user success!" });
        } catch (err) {
            console.error("Delete user error:", err);
            res.status(500).json({ EC: 1, MS: "Delete user error!", err });
        }
    },
    //LOGIN

    postLogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ EC: 1, MS: "The email address does not exist." });
            }

            const isMatch = await user.matchPassword(password);

            if (!isMatch) {
                return res.status(401).json({ message: "Incorrect password" });
            }

            const token = user.getSignedJwtToken();

            res.json({
                EC: 0,
                MS: "Login Success",
                user: {
                    token,
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                },
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ EC: 2, MS: "Login error", err });
        }
    },
    postSignUp: async (req, res) => {
        try {
            const { email, password, address, phoneNumber, role } = req.body;
            const avatar = req.file ? req.file.path : null; // Lấy đường dẫn của ảnh được tải lên

            // Kiểm tra xem email đã tồn tại chưa
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ EC: 1, MS: "Email already exists." });
            }

            // Tạo người dùng mới
            const newUser = new User({
                email,
                password,
                address,
                phoneNumber,
                role,
                avatar,
            });

            // Lưu người dùng mới vào cơ sở dữ liệu
            const saveUser = await newUser.save();

            // Tạo token cho người dùng mới
            const token = saveUser.getSignedJwtToken();

            // Trả về thông tin người dùng và token
            res.status(200).json({
                EC: 0,
                MS: "Sign Up and Login success!",
                user: {
                    token,
                    id: saveUser._id,
                    email: saveUser.email,
                    role: saveUser.role,
                    avatar: saveUser.avatar,
                },
            });
        } catch (err) {
            res.status(500).json({ EC: 2, MS: "Sign up error!", err });
        }
    },
};

module.exports = userController;
