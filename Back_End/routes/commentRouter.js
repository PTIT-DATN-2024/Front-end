const commentController = require("../controllers/commentController");
const router = require("express").Router();

// Thêm mới Comment
router.post("/", commentController.addComment);

// Lấy tất cả Comments của một sản phẩm theo idProduct
router.get("/product/:idProduct", commentController.getAllCommentsByProductId);

// // Lấy một Comment theo id
router.get("/:id", commentController.getAnComment);

// Cập nhật Comment theo id
router.put("/:id", commentController.updateComment);

// Xóa Comment theo id
router.delete("/:id", commentController.deleteComment);

module.exports = router;
