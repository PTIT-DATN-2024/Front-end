
const paymentController = require("../controllers/paymentController");
const router = require("express").Router();



router.post("/create_payment", paymentController.createPayment);
router.get("/vnpay_return", paymentController.handleReturn);

module.exports = router;
