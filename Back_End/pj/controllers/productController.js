const { User, Product, Category, Order, Voucher } = require("../model/model");

const productController = {
    //ADD Product
    addProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            const saveProduct = await newProduct.save();
            res.status(200).json({ EC: 0, MS: "Add Product success!", saveProduct });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Add Product error!", err }); //HTTP REQUEST CODE
        }
    },
    //GET ALL Product
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json({ EC: 0, MS: "Get all product success!", products });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Get all product error!", err });
        }
    },
    //GET AN Product
    getAnProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ EC: 1, MS: "Product not found" });
            }
            res.status(200).json({ EC: 0, MS: "Get a product success!", product });
        } catch (err) {
            res.status(500).json({ EC: 2, MS: "Get a procust error!", err });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            await product.updateOne({ $set: req.body });
            res.status(200).json({ EC: 0, MS: "Update product success!" });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Update product error!", err });
        }
    },

    //DELETE Product
    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json({ EC: 0, MS: "Delete product success!" });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Delete product error!", err });
        }
    },
};

module.exports = productController;
