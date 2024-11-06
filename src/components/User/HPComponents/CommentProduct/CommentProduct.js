import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postCreateComment, getCommentsProduct, deleteComment, getAllProducts, postVote, deleteVote } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import "./CommentProduct.scss";
import { BsArrowReturnRight } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const CommentProduct = (props) => {
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);
    const userState = useSelector((state) => state.user.account);
    let product = listProducts.find((item) => item._id === props.productId);
    const [listcomment, setListComment] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [userRating, setUserRating] = useState(5);
    const [filteredComments, setFilteredComments] = useState([]);

    // Lấy danh sách bình luận
    const fetchListComment = async () => {
        let res = await getCommentsProduct(props.productId);
        if (res.EC === 0) {
            let sortedComments = res.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setListComment(sortedComments);
        }
    };
    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_product",
                payload: res.products,
            });
            toast.success(res.MS);
            product = listProducts.find((item) => item._id === props.productId);
        }
    };
    const filterReviewByRate = (rating) => {
        if (rating === "") {
            // Nếu không có rating, hiển thị tất cả bình luận
            setFilteredComments(listcomment);
        } else {
            // Lọc danh sách bình luận theo rating
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

        // Gửi bình luận
        let commentResponse = await postCreateComment(product._id, userState._id, newComment, userRating);
        if (commentResponse.EC === 0) {
            toast.success("Bình luận đã được gửi!");
            setNewComment("");
            fetchListComment();
        } else {
            toast.error("Có lỗi khi gửi bình luận.");
        }
        fetchListProducts();
        product = listProducts.find((item) => item._id === props.productId);

    };

    // Xóa bình luận
    const onRemoveClick = async (commentId) => {
        let res = await deleteComment(commentId);
        if (res.EC === 0) {
            toast.success("Xóa bình luận thành công!");
            fetchListComment();
        }
        else {
            toast.error("Có lỗi khi xóa bình luận.");
        }
        fetchListProducts();
        product = listProducts.find((item) => item._id === props.productId);
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
                    {/* <img src="https://hacom.vn/media/lib/star_0.png" alt="rating" width="1" height="1" className="loading" data-was-processed="true" /> */}
                </p>

                <div className="pd-filter-list">
                    <div onClick={() => filterReviewByRate('')} className="js-filter-rate current">Tất cả</div>
                    {[5, 4, 3, 2, 1].map((rate) => (
                        <div key={rate} onClick={() => filterReviewByRate(rate)} className="js-filter-rate">
                            {rate} <FaStar />
                        </div>
                    ))}
                </div>
            </div>

            <div id="review-2020">
                <div id="form-review" >
                    <div className="star-rank">
                        <span style={{ float: 'left' }}>Chọn đánh giá của bạn</span>
                        <div className="rating-comment" style={{ float: 'left', marginLeft: '20px' }} id="select-rate-pro">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    onClick={() => setUserRating(star)}
                                    className="rating-input"
                                    color={star <= userRating ? "#ffc107" : "#e4e5e9"}
                                />
                            ))}
                            <div className="rating-star" >{
                                userRating === 5 ? "Rất hài lòng" : userRating === 4 ? "Hài lòng" : userRating === 3 ? "Bình thường" : userRating === 2 ? "Tạm được" : "Không thích"
                            }</div>
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
                        <div className="review-right" onClick={onAddNewComment} style={{ marginLeft: '0' }}>
                            GỬI ĐÁNH GIÁ
                        </div>
                    </div>
                </div>

                <div className="list-review-2020">
                    {filteredComments.map((comment) => (
                        <div key={comment._id} className="comment-item">
                            <div className="cmtUser">
                                <div className="name">
                                    {comment.idUser}
                                </div>
                                <div className="time">
                                    {comment.createdAt}
                                </div>
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
                            <div className="review">

                                {comment.content}
                            </div>
                            <div className="comment-actions">
                                <MdOutlineEdit />
                                <FaRegTrashAlt onClick={() => onRemoveClick(comment._id)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentProduct;
