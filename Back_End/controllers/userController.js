const { User, Product, Categorie, Order, Voucher } = require("../model/model");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const userController = {
    //ADD USER
    addUser: async (req, res) => {
        try {
            const { email, password, address, phoneNumber, role } = req.body;
            const avatar = req.file ? req.file.path : null;
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
            res.status(500).json({ EC: 1, MS: "Add user error!", err });
        }
    },
    // GET ALL USERS
    getAllUsers: async (req, res) => {
        try {
            const usersOld = await User.find({ isDeleted: false }); // Chỉ lấy người dùng không bị xóa mềm
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
    
    // GET A USER
    getAnUser: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id, isDeleted: false }); // Chỉ lấy người dùng không bị xóa mềm
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
            if (req.file) {
                if (user.avatar) {
                    const avatarPath = path.join(__dirname, "..", user.avatar);
                    if (fs.existsSync(avatarPath)) {
                        fs.unlinkSync(avatarPath);
                    }
                }
                user.avatar = req.file.path;
            }
            user.address = req.body.address || user.address;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
            user.role = req.body.sellingprroleice || user.role;
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
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ EC: 1, MS: "User not found" });
            }
            const orders = await Order.find({ userId });
            if (orders.length > 0) {
                // Nếu có đơn hàng liên quan, thực hiện xóa mềm
                user.isDeleted = true;
                await user.save();
                res.status(200).json({ EC: 0, MS: "User marked as deleted successfully!" });
            } else {
                // Nếu không có đơn hàng liên quan, thực hiện xóa cứng
                if (user.avatar) {
                    let avatarPath = path.join(__dirname, "..", user.avatar);
                    avatarPath = path.normalize(avatarPath);
                    if (fs.existsSync(avatarPath)) {
                        fs.unlinkSync(avatarPath);
                    } else {
                        console.log(`File ${avatarPath} not found`);
                    }
                }
                await user.remove();
                res.status(200).json({ EC: 0, MS: "User deleted successfully!" });
            }
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
            const avatar = req.file ? req.file.path : null;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ EC: 1, MS: "Email already exists." });
            }
            const newUser = new User({
                email,
                password,
                address,
                phoneNumber,
                role,
                avatar,
            });
            const saveUser = await newUser.save();
            const token = saveUser.getSignedJwtToken();
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
