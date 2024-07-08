const orderController = require("../controllers/orderController");

const router = require("express").Router();

//ADD Category
router.post("/", orderController.addOrder);

//GET ALL Categorys
router.get("/", orderController.getAllOrders);

//GET AN Category
router.get("/:id", orderController.getAnOrder);

//UPDATE AN Category
router.put("/:id", orderController.updateOrder);

//DELETE Category
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
