const categoryController = require("../controllers/categoryController");
const upload = require("../middleware/uploadMiddleware");
const router = require("express").Router();

//ADD Category
router.post(
    "/",
    (req, res, next) => {
        req.entityType = "category"; // Thêm trường entityType cho user
        next();
    },
    upload.single("avatar"),
    categoryController.addCategory
);

//GET ALL Categorys
router.get("/", categoryController.getAllCategories);

//GET AN Category
router.get("/:id", categoryController.getAnCategory);

//UPDATE AN Category
router.put(
    "/:id",
    (req, res, next) => {
        req.entityType = "category"; // Thêm trường entityType cho user
        next();
    },
    upload.single("avatar"),
    categoryController.updateCategory
);

//DELETE Category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
