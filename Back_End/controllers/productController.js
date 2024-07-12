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

    // GET ALL Products
    getAllProducts: async (req, res) => {
        try {
            const productsOld = await Product.find().populate("category", "name"); // Populate category field with name

            if (!productsOld) {
                return res.status(404).json({ EC: 2, MS: "Product not found!" });
            }

            const products = productsOld.map((product) => ({
                _id: product._id,
                name: product.name,
                importprice: product.importprice,
                sellingprice: product.sellingprice,
                category: {
                    idCategory: product.category._id,
                    nameCategory: product.category.name,
                },
                weight: product.weight,
                presentimage: product.presentimage,
                description: product.description,
                count: product.count,
            }));

            res.json({ EC: 0, MS: "Get all Products success!", products });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Get all Products failed!", err });
        }
    },
    //GET A Product
    getAnProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id).populate("category", "name");
            if (!product) {
                return res.status(404).json({ EC: 1, MS: "Product not found" });
            }

            const productData = {
                _id: product._id,
                name: product.name,
                importprice: product.importprice,
                sellingprice: product.sellingprice,
                category: {
                    idCategory: product.category._id,
                    nameCategory: product.category.name,
                },
                weight: product.weight,
                presentimage: product.presentimage,
                description: product.description,
                count: product.count,
            };

            res.status(200).json({ EC: 0, MS: "Get a product success!", product: productData });
        } catch (err) {
            res.status(500).json({ EC: 2, MS: "Get a product error!", err });
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
