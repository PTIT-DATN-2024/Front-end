// import a from "../uploads";

const { User, Product, Category, Order, Voucher } = require("../model/model");
const fs = require("fs");
const path = require("path");

const productController = {
    //ADD Product
    addProduct: async (req, res) => {
        try {
            const { name, importprice, weight, sellingprice, description, count, category } = req.body;
            const presentImage = req.file ? req.file.path : null; // Lấy đường dẫn của ảnh được tải lên

            const newProduct = new Product({
                name,
                weight,
                importprice,
                sellingprice,
                description,
                count,
                category,
                presentImage,
            });

            const savedProduct = await newProduct.save();
            res.status(200).json({ EC: 0, MS: "Add Product success!", savedProduct });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Add Product error!", err });
        }
    },

    // GET ALL Products
    getAllProducts: async (req, res) => {
        try {
            const productsOld = await Product.find().populate("category", "name");

            if (!productsOld || productsOld.length === 0) {
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
                presentImage: product.presentImage ? `/v1/uploads/products/${product.presentImage.replace("uploads\\products\\", "")}` : null,
                description: product.description,
                count: product.count,
            }));

            res.json({ EC: 0, MS: "Get all Products success!", products });
        } catch (err) {
            console.error("Get all Products error:", err);
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
                presentImage: `/v1/uploads/products/${product.presentImage.replace("uploads\\products\\", "")}`,
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

            if (!product) {
                return res.status(404).json({ EC: 1, MS: "Product not found" });
            }

            // Xử lý cập nhật tệp ảnh presentImage nếu có
            if (req.file) {
                if (product.presentImage) {
                    const imagePath = path.join(__dirname, "..", product.presentImage);

                    // Kiểm tra xem tệp cũ có tồn tại không trước khi xóa
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath); // Xóa tệp cũ từ hệ thống tệp
                    }
                }

                // Cập nhật đường dẫn tệp ảnh mới
                product.presentImage = req.file.path;
            }

            // Cập nhật các trường thông tin sản phẩm từ req.body
            product.name = req.body.name || product.name;
            product.importprice = req.body.importprice || product.importprice;
            product.weight = req.body.weight || product.weight;
            product.sellingprice = req.body.sellingprice || product.sellingprice;
            product.description = req.body.description || product.description;
            product.count = req.body.count || product.count;
            product.category = req.body.category || product.category;

            // Lưu các thay đổi vào cơ sở dữ liệu
            await product.save();

            res.status(200).json({ EC: 0, MS: "Update product success!" });
        } catch (err) {
            console.error("Update product error:", err);
            res.status(500).json({ EC: 1, MS: "Update product error!", err });
        }
    },

    //DELETE Product
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ EC: 1, MS: "Product not found" });
            }

            // Xóa tệp presentImage nếu tồn tại
            if (product.presentImage) {
                let imagePath = path.join(__dirname, "..", product.presentImage);
                imagePath = path.normalize(imagePath); // Chuẩn hóa đường dẫn
                // Kiểm tra xem tệp có tồn tại không trước khi xóa
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath); // Xóa tệp từ hệ thống tệp
                } else {
                    console.log(`File ${imagePath} not found`);
                }
            }

            await product.remove(); // Xóa sản phẩm từ cơ sở dữ liệu

            res.status(200).json({ EC: 0, MS: "Delete product success!" });
        } catch (err) {
            console.error("Delete product error:", err);
            res.status(500).json({ EC: 1, MS: "Delete product error!", err });
        }
    },
};

module.exports = productController;
