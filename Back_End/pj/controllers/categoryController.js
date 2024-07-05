const { User, Product, Category, Order, Voucher } = require("../model/model");

const categoryController = {
    //ADD Category
    addCategory: async (req, res) => {
        try {
            const newCategory = new Category(req.body);
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
            res.status(200).json({ EC: 0, MS: "Get all category success!", categories });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Get all category success!", err });
        }
    },
    //GET AN Category
    getAnCategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ EC: 1, MS: "Category not found" });
            }
            res.status(200).json({ EC: 0, MS: "Get a category success!", category });
        } catch (err) {
            res.status(500).json({ EC: 2, MS: "Get a category error!", err });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            await category.updateOne({ $set: req.body });
            res.status(200).json({ EC: 0, MS: "Update success!" });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Update error!", err });
        }
    },
    //DELETE Category
    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id);
            res.status(200).json({ EC: 0, MS: "Delete success!" });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Delete error!", err });
        }
    },
};

module.exports = categoryController;
