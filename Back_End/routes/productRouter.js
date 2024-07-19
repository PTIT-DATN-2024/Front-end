const productController = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");
const router = require("express").Router();


router.post(
    "/",
    (req, res, next) => {
        req.entityType = "product"; 
        next();
    },
    upload.single("presentImage"),
    productController.addProduct
);

//GET ALL Products
router.get("/", productController.getAllProducts);

//GET AN Product
router.get("/:id", productController.getAnProduct);

//UPDATE AN Product
router.put(
    "/:id",
    (req, res, next) => {
        req.entityType = "product"; 
        next();
    },
    upload.single("presentImage"),
    productController.updateProduct
);

//DELETE Product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
