const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// timeStart
// timeEnd
// quantity
// saleOff
// createdAt
const voucherSchema = new mongoose.Schema({
    timeStart: {
        type: String,
        required: true,
    },
    timeEnd: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    saleOff: {
        type: Number,
        required: true,
        min: 0,
        max: 100, // Sale off percentage from 0 to 100
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// user
// listItem
// Total
// createdAt
const orderSchema = new mongoose.Schema({
    listItem: [
        {
            idProduct: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            sum: {
                type: Number,
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    statusOrder: {
        type: String,
        enum: ['CXN', 'CLH', 'DG', 'DH', 'HT'],  // Mã viết tắt cho các trạng thái
        default: 'CXN',  // Trạng thái mặc định là 'CXN' (Chờ xác nhận)
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// name
// avâtr
const bgImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// name
// avâtr
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const commentSchema = new mongoose.Schema({
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    }, // Reference to the product
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    }, // Reference to the user
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});



//  name,
//  barcode,
// category
//  importprice,
//  sellingprice,
//  weight,
//  presentimage,
//  detailedimage,
//  description
//  count

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    importprice: {
        type: Number,
        required: true,
    },
    sellingprice: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    presentImage: {
        type: String,
    },
    description: {
        type: String,
    },
    count: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        default: 5,
        min: 0,
        max: 5,
    },
    numberVote: {
        type: Number,
        default: 1,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// email: email,
// password: password,
// address: address,
// phoneNumber: phoneNumber,
// role: role,
// avatar: avatar,
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    avatar: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
// Phương thức tạo JWT
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

let User = mongoose.model("Users", userSchema);
let Product = mongoose.model("Products", productSchema);
let Category = mongoose.model("Categories", categorySchema);
let Order = mongoose.model("Orders", orderSchema);
let Comment = mongoose.model("Comments", commentSchema);
let Voucher = mongoose.model("Vouchers", voucherSchema);
let BgImage = mongoose.model("BgImages", bgImageSchema);
module.exports = { User, Product, Category, Order, Voucher, Comment, BgImage };
