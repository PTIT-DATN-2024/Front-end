const { Comment } = require("../model/model");

const commentController = {
    // add Comment
    addComment: async (req, res) => {
        try {
            const newComment = new Comment({
                ...req.body,
                listReply: [],
            });
            const savedComment = await newComment.save();
            if (req.body.replyFor) {
                const parentComment = await Comment.findById(req.body.replyFor);
                if (parentComment) {
                    parentComment.listReply.push(savedComment._id);
                    await parentComment.save();
                }
            }
            res.status(200).json({ EC: 0, MS: "Thêm Comment thành công!", comment: savedComment });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Lỗi thêm Comment!", err });
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

            // Xóa id của comment trong listReply của comment parent
            if (comment.replyFor) {
                const parentComment = await Comment.findById(comment.replyFor);
                if (parentComment) {
                    parentComment.listReply.pull(comment._id);
                    await parentComment.save();
                }
            }

            // Xóa các comment con trong listReply của comment
            for (const replyId of comment.listReply) {
                await Comment.findByIdAndDelete(replyId);
            }

            await Comment.findByIdAndDelete(comment._id);

            res.status(200).json({ EC: 0, MS: "Xóa thành công!" });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Lỗi xóa!", err });
        }
    },
};

module.exports = commentController;
