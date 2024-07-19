const orderController = require("../controllers/orderController");

const router = require("express").Router();


router.post("/", orderController.addOrder);


router.get("/", orderController.getAllOrders);


router.get("/:id", orderController.getAnOrder);


router.put("/:id", orderController.updateOrder);


router.delete("/:id", orderController.deleteOrder);

module.exports = router;
