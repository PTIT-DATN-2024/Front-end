const commentController = require("../controllers/dashBoardController");
const router = require("express").Router();




router.get("/ecommerce", commentController.getEcommerceDB);



module.exports = router;
