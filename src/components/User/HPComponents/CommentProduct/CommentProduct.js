import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postCreateComment, getCommentsProduct, deleteComment, getAllProducts, postVote, deleteVote } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import "./CommentProduct.scss";
import { BsArrowReturnRight } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const CommentProduct = (props) => {
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);
    const userState = useSelector((state) => state.user.account);
    let product = listProducts.find((item) => item._id === props.productId);
    const [listcomment, setListComment] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [userRating, setUserRating] = useState(null);

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
        fetchListProducts();
        fetchListComment();

    }, []);

    return (
        <div className="pd-box-container" id="pd-review-group">
            <p className="box-title">Nhận xét và Đánh giá</p>

            <div className="pd-comment-filter">
                <p className="group-title">
                    <b>{product.rate.toFixed(1)}/5</b>
                    <img src="https://hacom.vn/media/lib/star_0.png" alt="rating" width="1" height="1" className="loading" data-was-processed="true" />
                </p>

                {/* <div className="pd-filter-list d-flex flex-wrap align-items-center">
                    <a href="javascript:void(0)" onClick={() => filterReviewByRate('')} className="js-filter-rate current">Tất cả</a>
                    {[5, 4, 3, 2, 1].map((rate) => (
                        <a key={rate} href="javascript:void(0)" onClick={() => filterReviewByRate(rate)} className="js-filter-rate">
                            {rate} <i className="fas fa-star"></i>
                        </a>
                    ))}
                </div> */}
            </div>

            <div id="review-2020">
                <div id="form-review" >
                    <div className="star-rank">
                        <span style={{ float: 'left' }}>Chọn đánh giá của bạn</span>
                        <div className="rating-comment" style={{ float: 'left', marginLeft: '20px' }} id="select-rate-pro">
                            {[5, 4, 3, 2, 1].map((value) => (
                                <React.Fragment key={value}>
                                    <input
                                        type="radio"
                                        className="rating-input"
                                        id={`rating-input-review-0-${value}`}
                                        value={value}
                                        checked={userRating === value}
                                        onChange={() => setUserRating(value)}
                                    />
                                    <label htmlFor={`rating-input-review-0-${value}`} className="rating-star" data-title={
                                        value === 5 ? "Rất hài lòng" : value === 4 ? "Hài lòng" : value === 3 ? "Bình thường" : value === 2 ? "Tạm được" : "Không thích"
                                    }></label>
                                </React.Fragment>
                            ))}
                        </div>
                        <span id="star_tip" style={{ display: 'inline' }}>Hài lòng</span>
                    </div>

                    <div className="review-box">
                        <div className="review-left">
                            <textarea
                                placeholder="Nhập đánh giá về sản phẩm (tối thiểu 80 ký tự)"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="review-right" onClick={onAddNewComment} style={{ width: '100%', marginLeft: '0' }}>
                            GỬI ĐÁNH GIÁ
                        </div>
                    </div>
                </div>

                <div className="list-review-2020">
                    {listcomment.map((comment) => (
                        <div key={comment._id} className="comment-item">
                            <p>{comment.content}</p>
                            <p>{comment.rating}</p>
                            <div className="comment-actions">
                                <BsArrowReturnRight />
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
