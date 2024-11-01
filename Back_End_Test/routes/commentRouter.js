const commentController = require("../controllers/commentController");
const router = require("express").Router();


router.post("/", commentController.addComment);

router.get("/product/:idProduct", commentController.getAllCommentsByProductId);

router.get("/:id", commentController.getAnComment);

router.put("/:id", commentController.updateComment);

router.delete("/:id", commentController.deleteComment);

module.exports = router;
