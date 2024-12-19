import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    postCreateComment,
    getCommentsProduct,
    deleteComment,
    getAllProducts,
    putUpdateComment
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
import "./CommentProduct.scss";
import { BsArrowReturnRight } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import moment from "moment";

const CommentProduct = (props) => {
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);
    const userState = useSelector((state) => state.user.account);

    let product = listProducts.find((item) => item.productId === props.productId);

    const [listcomment, setListComment] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [userRating, setUserRating] = useState(5);
    const [filteredComments, setFilteredComments] = useState([]);

    const [editingCommentId, setEditingCommentId] = useState(null); // ID của bình luận đang chỉnh sửa
    const [updatedComment, setUpdatedComment] = useState(""); // Nội dung chỉnh sửa
    const [updatedRating, setUpdatedRating] = useState(""); // Nội dung chỉnh sửa

    // Lấy danh sách bình luận
    const fetchListComment = async () => {
        let res = await getCommentsProduct(props.productId);
        if (res.EC === 0) {
            let sortedComments = res.productReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setListComment(sortedComments);
        }
    };

    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_product",
                payload: res.products.filter((product) => product.isDelete === "False"),
            });
            toast.success(res.MS);
            product = listProducts.find((item) => item.productId === props.productId);
        }
    };

    const filterReviewByRate = (rating) => {
        if (rating === "") {
            setFilteredComments(listcomment);
        } else {
            const filtered = listcomment.filter((comment) => comment.rating === rating);
            setFilteredComments(filtered);
        }
    };

    // Thêm mới đánh giá và bình luận
    const onAddNewComment = async () => {
        if (userRating === null) {
            setUserRating(5);
        }
        if (newComment.length < 1) {
            toast.error("Nội dung bình luận phải có ít nhất 1 ký tự.");
            return;
        }

        let commentResponse = await postCreateComment(product.productId, userState.id, newComment, userRating);
        if (commentResponse.EC === 0) {
            toast.success("Bình luận đã được gửi!");
            setNewComment("");
            fetchListComment();
        } else {
            toast.error("Có lỗi khi gửi bình luận.");
        }
        fetchListProducts();
    };

    // Xóa bình luận
    const onRemoveClick = async (productReviewId) => {
        let res = await deleteComment(productReviewId);
        if (res.EC === 0) {
            toast.success("Xóa bình luận thành công!");
            fetchListComment();
        } else {
            toast.error("Có lỗi khi xóa bình luận.");
        }
        fetchListProducts();
    };

    // Chỉnh sửa bình luận
    const onEditClick = (commentId, currentContent, rating) => {
        setEditingCommentId(commentId);
        setUpdatedComment(currentContent);
        setUpdatedRating(rating);
    };

    // Lưu bình luận đã chỉnh sửa
    const onUpdateComment = async () => {
        if (updatedComment.length < 1) {
            toast.error("Nội dung bình luận phải có ít nhất 1 ký tự.");
            return;
        }

        let res = await putUpdateComment(editingCommentId, product.productId, userState.id, updatedComment, updatedRating);
        if (res.EC === 0) {
            toast.success("Cập nhật bình luận thành công!");
            fetchListComment();
            setEditingCommentId(null); // Thoát khỏi chế độ chỉnh sửa
            setUpdatedComment("");
            setUpdatedRating("");
        } else {
            toast.error("Có lỗi khi cập nhật bình luận.");
        }
    };

    useEffect(() => {
        fetchListComment();
        filterReviewByRate("");
    }, []);

    useEffect(() => {
        filterReviewByRate("");
    }, [listcomment]);

    return (
        <div className="pd-box-container" id="pd-review-group">
            <p className="box-title">Nhận xét và Đánh giá</p>
            <div className="pd-comment-filter">
                <p className="group-title">
                    <b>{product.rate.toFixed(1)}/5</b>
                    <div className="loading">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className="rating-input"
                                color={star <= product.rate ? "#ffc107" : "#e4e5e9"}
                            />
                        ))}
                    </div>
                </p>

                <div className="pd-filter-list">
                    <div onClick={() => filterReviewByRate("")} className="js-filter-rate current">
                        Tất cả
                    </div>
                    {[5, 4, 3, 2, 1].map((rate) => (
                        <div key={rate} onClick={() => filterReviewByRate(rate)} className="js-filter-rate">
                            {rate} <FaStar />
                        </div>
                    ))}
                </div>
            </div>
            <div id="review-2020">
                <div id="form-review">
                    <div className="star-rank">
                        <span style={{ float: "left" }}>Chọn đánh giá của bạn</span>
                        <div className="rating-comment" style={{ float: "left", marginLeft: "20px" }} id="select-rate-pro">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    onClick={() => setUserRating(star)}
                                    className="rating-input"
                                    color={star <= userRating ? "#ffc107" : "#e4e5e9"}
                                />
                            ))}
                            <div className="rating-star">
                                {userRating === 5
                                    ? "Rất hài lòng"
                                    : userRating === 4
                                        ? "Hài lòng"
                                        : userRating === 3
                                            ? "Bình thường"
                                            : userRating === 2
                                                ? "Tạm được"
                                                : "Không thích"}
                            </div>
                        </div>
                    </div>

                    <div className="review-box">
                        <div className="review-left">
                            <textarea
                                placeholder="Nhập đánh giá về sản phẩm (tối thiểu 80 ký tự)"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="review-right" onClick={onAddNewComment} style={{ marginLeft: "0" }}>
                            GỬI ĐÁNH GIÁ
                        </div>
                    </div>
                </div>

                <div className="list-review-2020">
                    {filteredComments.map((comment) => (
                        <div key={comment.productReviewId} className="comment-item">
                            {editingCommentId === comment.productReviewId ? (
                                <div className="cmtUser">
                                    <div className="name">{comment.customer.email}</div>
                                    <div className="time">{moment(comment.createdAt).format("DD/MM/YY")}</div>
                                    <div>
                                        {/* {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className="rating-input"
                                                color={star <= comment.rating ? "#ffc107" : "#e4e5e9"}
                                            />
                                        ))} */}
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                onClick={() => setUpdatedRating(star)}
                                                className="rating-input"
                                                color={star <= updatedRating ? "#ffc107" : "#e4e5e9"}
                                            />
                                        ))}
                                        <div className="rating-star">
                                            {userRating === 5
                                                ? "Rất hài lòng"
                                                : userRating === 4
                                                    ? "Hài lòng"
                                                    : userRating === 3
                                                        ? "Bình thường"
                                                        : userRating === 2
                                                            ? "Tạm được"
                                                            : "Không thích"}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="cmtUser">
                                    <div className="name">{comment.customer.email}</div>
                                    <div className="time">{moment(comment.createdAt).format("DD/MM/YY")}</div>
                                    <div>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className="rating-input"
                                                color={star <= comment.rating ? "#ffc107" : "#e4e5e9"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {editingCommentId === comment.productReviewId ? (

                                <textarea 
                                    type="text"
                                    value={updatedComment}
                                    onChange={(e) => setUpdatedComment(e.target.value)}
                                    className="review"
                                />

                            ) : (
                                <textarea 
                                    type="text"
                                    className="review"
                                    readOnly
                                    value={comment.comment}
                                />
                            )}
                            {editingCommentId === comment.productReviewId ? (
                                <div className="comment-actions">
                                    <button onClick={onUpdateComment}>Lưu</button>
                                    <button onClick={() => setEditingCommentId(null)}>Hủy</button>
                                </div>
                            ) : (
                                userState.id === comment.customer.customerId ? (
                                    <div className="comment-actions">
                                        <MdOutlineEdit
                                            onClick={() => onEditClick(comment.productReviewId, comment.comment, comment.rating)}
                                        />
                                        <FaRegTrashAlt onClick={() => onRemoveClick(comment.productReviewId)} />
                                    </div>
                                ) : (
                                    <div className="comment-actions">

                                    </div>
                                )
                            )}



                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentProduct;
