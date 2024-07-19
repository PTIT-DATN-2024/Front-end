const {  Product, Category} = require("../model/model");
const path = require("path");
const fs = require("fs");
const categoryController = {
    //ADD Category
    addCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const avatar = req.file ? req.file.path : null;
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

            if (req.file) {
                if (category.avatar) {
                    const imagePath = path.join(__dirname, "..", category.avatar);

                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }

                category.avatar = req.file.path;
            }

            category.name = req.body.name || category.name;

            await category.save();

            res.status(200).json({ EC: 0, MS: "Update success!" });
        } catch (err) {
            console.error("Update category error:", err);
            res.status(500).json({ EC: 1, MS: "Update error!", err });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ EC: 2, MS: "Category not found" });
            }
            const hasRelatedProducts = await Product.exists({ category: req.params.id });
            if (hasRelatedProducts) {
                return res.status(200).json({ EC: 1, MS: "Cannot delete category with related products" });
            }
            if (category.avatarImage) {
                let imagePath = path.join(__dirname, "..", category.avatarImage);
                imagePath = path.normalize(imagePath);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                } else {
                    console.log(`File ${imagePath} not found`);
                }
            }
            await Category.findByIdAndDelete(req.params.id);

            res.status(200).json({ EC: 0, MS: "Delete success!" });
        } catch (err) {
            console.error("Delete category error:", err);
            res.status(500).json({ EC: 3, MS: "Delete error!", err });
        }
    },
};

module.exports = categoryController;
