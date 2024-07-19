const { User, Product, Category, Order, Voucher } = require("../model/model");
const path = require("path");
const fs = require("fs");
const categoryController = {
    //ADD Category
    addCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const avatar = req.file ? req.file.path : null; // Lấy đường dẫn của ảnh được tải lên

            const newCategory = new Category({
                name,
                avatar,
            });
            const saveCategory = await newCategory.save();
            res.status(200).json({ EC: 0, MS: "Add Category success!", saveCategory });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Add Category error!", err });
        }
    },
    //GET ALL Category
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find();

            const categoriesWithImages = categories.map((category) => ({
                _id: category._id,
                name: category.name,
                avatar: category.avatar ? `/v1/uploads/categories/${category.avatar.replace("uploads\\categories\\", "")}` : null,
            }));

            res.status(200).json({ EC: 0, MS: "Get all categories success!", categories: categoriesWithImages });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Get all categories failed!", err });
        }
    },
    //GET AN Category
    getAnCategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ EC: 1, MS: "Category not found" });
            }

            const categoryData = {
                _id: category._id,
                name: category.name,
                avatar: category.avatar ? `/v1/uploads/categories/${category.avatar.replace("uploads\\categories\\", "")}` : null,
            };

            res.status(200).json({ EC: 0, MS: "Get a category success!", category: categoryData });
        } catch (err) {
            res.status(500).json({ EC: 2, MS: "Get a category error!", err });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
    
            if (!category) {
                return res.status(404).json({ EC: 1, MS: "Category not found" });
            }
    
            // Xử lý cập nhật tệp ảnh avatar nếu có
            if (req.file) {
                if (category.avatar) {
                    const imagePath = path.join(__dirname, "..", category.avatar);
    
                    // Kiểm tra xem tệp cũ có tồn tại không trước khi xóa
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath); // Xóa tệp cũ từ hệ thống tệp
                    }
                }
    
                // Cập nhật đường dẫn tệp ảnh mới
                category.avatar = req.file.path;
            }
    
            // Cập nhật các trường thông tin danh mục từ req.body
            category.name = req.body.name || category.name;
    
            // Lưu các thay đổi vào cơ sở dữ liệu
            await category.save();
    
            res.status(200).json({ EC: 0, MS: "Update success!" });
        } catch (err) {
            console.error("Update category error:", err);
            res.status(500).json({ EC: 1, MS: "Update error!", err });
        }
    },
    

    deleteCategory: async (req, res) => {
        try {
            // Tìm danh mục để xóa
            const category = await Category.findById(req.params.id);

            if (!category) {
                return res.status(404).json({ EC: 2, MS: "Category not found" });
            }

            // Kiểm tra xem danh mục có sản phẩm liên quan không
            const hasRelatedProducts = await Product.exists({ category: req.params.id });

            if (hasRelatedProducts) {
                return res.status(200).json({ EC: 1, MS: "Cannot delete category with related products" });
            }

            // Xóa tệp avatarImage nếu tồn tại
            if (category.avatarImage) {
                let imagePath = path.join(__dirname, "..", category.avatarImage);
                imagePath = path.normalize(imagePath); // Chuẩn hóa đường dẫn
                // Kiểm tra xem tệp có tồn tại không trước khi xóa
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath); // Xóa tệp từ hệ thống tệp
                } else {
                    console.log(`File ${imagePath} not found`);
                }
            }

            // Xóa danh mục từ cơ sở dữ liệu
            await Category.findByIdAndDelete(req.params.id);

            res.status(200).json({ EC: 0, MS: "Delete success!" });
        } catch (err) {
            console.error("Delete category error:", err);
            res.status(500).json({ EC: 3, MS: "Delete error!", err });
        }
    },
};

module.exports = categoryController;
