const productController = require("../controllers/productController");

const router = require("express").Router();

//ADD Product
router.post("/", productController.addProduct);

//GET ALL Products
router.get("/", productController.getAllProducts);

//GET AN Product
router.get("/:id", productController.getAnProduct);

//UPDATE AN Product
router.put("/:id", productController.updateProduct);

//DELETE Product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
