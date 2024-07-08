const { User, Product, Categorie, Order, Voucher } = require("../model/model");
const jwt = require('jsonwebtoken');
const userController = {
    //ADD USER
    addUser: async (req, res) => {
        try {
            // req.body.avatar = "example";
            const newUser = new User(req.body);
            const saveUser = await newUser.save();
            res.status(200).json({ EC: 0, MS: "Add user success!", saveUser });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Add user error!",err }); //HTTP REQUEST CODE
        }
    },
    //GET ALL User
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json({ EC: 0, MS: "Get all user success!", users });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Get all user error!", err });
        }
    },
    //GET AN User
    getAnUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ EC: 0, MS: "Get user success!", user });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Get user error!", err });
        }
    },

    //UPDATE USER
    updateUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            await user.updateOne({ $set: req.body });
            res.status(200).json({ EC: 0, MS: "Update user success!" });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Update user error!", err });
        }
    },
    //DELETE USER
    deleteUser: async (req, res) => {
        try {
            // await Book.updateMany({ author: req.params.id }, { author: null });
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ EC: 0, MS: "Delete user success!" });
        } catch (err) {
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
    
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
    
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
    }
};

module.exports = userController;
