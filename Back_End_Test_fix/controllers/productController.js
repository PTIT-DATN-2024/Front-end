const { Product, Order } = require("../model/model");
const fs = require("fs");
const path = require("path");

const productController = {
    // ADD Product
    addProduct: async (req, res) => {
        try {
            const { name, importprice, weight, sellingprice, description, count, category } = req.body;
            const presentImage = req.file ? req.file.path : null;
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
            const productsOld = await Product.find({ isDeleted: false }).populate("category", "name");
            if (!productsOld || productsOld.length === 0) {
                return res.status(404).json({ EC: 2, MS: "Products not found!" });
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
                rate: product.rate,
                numberVote: product.numberVote,
            }));
            res.json({ EC: 0, MS: "Get all Products success!", products });
        } catch (err) {
            console.error("Get all Products error:", err);
            res.status(500).json({ EC: 1, MS: "Get all Products failed!", err });
        }
    },

    // GET A Product
    getAnProduct: async (req, res) => {
        try {
            const product = await Product.findOne({ _id: req.params.id, isDeleted: false }).populate("category", "name");
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
                rate: product.rate,
                numberVote: product.numberVote,
            };
            res.status(200).json({ EC: 0, MS: "Get a product success!", product: productData });
        } catch (err) {
            res.status(500).json({ EC: 2, MS: "Get a product error!", err });
        }
    },

    // UPDATE Product
    updateProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ EC: 1, MS: "Product not found" });
            }
            if (req.file) {
                if (product.presentImage) {
                    const imagePath = path.join(__dirname, "..", product.presentImage);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }
                product.presentImage = req.file.path;
            }
            product.name = req.body.name || product.name;
            product.importprice = req.body.importprice || product.importprice;
            product.weight = req.body.weight || product.weight;
            product.sellingprice = req.body.sellingprice || product.sellingprice;
            product.description = req.body.description || product.description;
            product.count = req.body.count || product.count;
            product.category = req.body.category || product.category;

            await product.save();
            res.status(200).json({ EC: 0, MS: "Update product success!" });
        } catch (err) {
            console.error("Update product error:", err);
            res.status(500).json({ EC: 1, MS: "Update product error!", err });
        }
    },
    // DELETE Product
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ EC: 1, MS: "Product not found" });
            }
            const orders = await Order.find({ "listItem.idProduct": productId });
            if (orders.length > 0) {
                // Nếu có đơn hàng liên quan, thực hiện xóa mềm
                product.isDeleted = true;
                await product.save();
                res.status(200).json({ EC: 0, MS: "Product marked as deleted successfully!" });
            } else {
                // Nếu không có đơn hàng liên quan, thực hiện xóa thực sự
                if (product.presentImage) {
                    let imagePath = path.join(__dirname, "..", product.presentImage);
                    imagePath = path.normalize(imagePath);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    } else {
                        console.log(`File ${imagePath} not found`);
                    }
                }
                await product.remove();
                res.status(200).json({ EC: 0, MS: "Product deleted successfully!" });
            }
        } catch (err) {
            console.error("Delete product error:", err);
            res.status(500).json({ EC: 1, MS: "Delete product error!", err });
        }
    },
    searchProducts: async (req, res) => {
        try {
            const searchQuery = req.query.query; // Lấy từ khóa tìm kiếm từ query params
            if (!searchQuery) {
                return res.status(400).json({ EC: 1, MS: "Cần thiết phải có tham số truy vấn" });
            }

            const suggestions = await Product.find({
                name: { $regex: searchQuery, $options: "i" }, // Tìm kiếm không phân biệt hoa thường
                isDeleted: false,
            });

            if (!suggestions.length) {
                return res.status(404).json({ EC: 2, MS: "Không tìm thấy sản phẩm" });
            }

            // Chỉnh sửa để định dạng lại presentImage
            const formattedSuggestions = suggestions.map((product) => ({
                _id: product._id,
                name: product.name,
                importprice: product.importprice,
                sellingprice: product.sellingprice,
                category: {
                    idCategory: product.category._id,
                    nameCategory: product.category.name,
                },
                weight: product.weight,
                presentImage: `/v1/uploads/products/${product.presentImage.replace("uploads\\products\\", "")}`, // Chỉnh sửa đường dẫn hình ảnh
                description: product.description,
                count: product.count,
                rate: product.rate,
                numberVote: product.numberVote,
            }));

            res.status(200).json({ EC: 0, MS: "Tìm kiếm thành công", suggestions: formattedSuggestions });
        } catch (err) {
            console.error("Lỗi tìm kiếm:", err);
            res.status(500).json({ EC: 3, MS: "Lỗi tìm kiếm", err });
        }
    },
};

module.exports = productController;
