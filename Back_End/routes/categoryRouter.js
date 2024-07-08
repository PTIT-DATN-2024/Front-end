const categoryController = require("../controllers/categoryController");

const router = require("express").Router();

//ADD Category
router.post("/", categoryController.addCategory);

//GET ALL Categorys
router.get("/", categoryController.getAllCategories);

//GET AN Category
router.get("/:id", categoryController.getAnCategory);

//UPDATE AN Category
router.put("/:id", categoryController.updateCategory);

//DELETE Category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
