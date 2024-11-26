const { Comment, Product } = require("../model/model");

const commentController = {
    // add Comment
    addComment: async (req, res) => {
        try {
            const newComment = new Comment({
                ...req.body,
            });
            const savedComment = await newComment.save();

            const product = await Product.findById(req.body.idProduct);
            if (!product) {
                return res.status(404).json({ EC: 1, MS: "Không tìm thấy sản phẩm để cập nhật đánh giá!" });
            }

            const newNumberVote = product.numberVote + 1;
            const newRate = ((product.rate * product.numberVote) + req.body.rating) / newNumberVote;

            product.rate = newRate;
            product.numberVote = newNumberVote;
            await product.save();

            res.status(200).json({ EC: 0, MS: "Thêm Comment thành công và cập nhật đánh giá!", comment: savedComment });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Lỗi thêm Comment hoặc cập nhật sản phẩm!", err });
        }
    },
    // get cmt by product id
    getAllCommentsByProductId: async (req, res) => {
        try {
            const comments = await Comment.find({ idProduct: req.params.idProduct });
            res.status(200).json({ EC: 0, MS: "Lấy tất cả comments thành công!", comments });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Lỗi lấy tất cả comments!", err });
        }
    },

    // get Comment theo id
    getAnComment: async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id);
            if (!comment) {
                return res.status(404).json({ EC: 1, MS: "Không tìm thấy Comment" });
            }
            res.status(200).json({ EC: 0, MS: "Lấy một comment thành công!", comment });
        } catch (err) {
            res.status(500).json({ EC: 2, MS: "Lỗi lấy một comment!", err });
        }
    },

    // ud Comment theo id
    updateComment: async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id);
            await comment.updateOne({ $set: req.body });
            res.status(200).json({ EC: 0, MS: "Cập nhật thành công!", comment: comment });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Lỗi cập nhật!", err });
        }
    },

    // delete Comment theo id
    deleteComment: async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id);

            if (!comment) {
                return res.status(404).json({ EC: 1, MS: "Không tìm thấy Comment" });
            }

            // Tìm sản phẩm dựa trên idProduct của comment
            const product = await Product.findById(comment.idProduct);
            if (product && product.numberVote > 0) {
                // Tính toán lại số vote và rate mới
                const newNumberVote = product.numberVote - 1;
                let newRate = 0;
                if (newNumberVote > 0) {
                    newRate = ((product.rate * product.numberVote) - comment.rating) / newNumberVote;
                }
                // Cập nhật product với rate và numberVote mới
                product.rate = newRate;
                product.numberVote = newNumberVote;
                await product.save();
            }
            // Xóa comment
            await Comment.findByIdAndDelete(comment._id);
            res.status(200).json({ EC: 0, MS: "Xóa comment thành công và cập nhật đánh giá!" });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Lỗi xóa comment hoặc cập nhật sản phẩm!", err });
        }
    },
};

module.exports = commentController;
