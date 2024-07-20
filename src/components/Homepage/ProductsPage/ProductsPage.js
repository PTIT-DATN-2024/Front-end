import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { postCreateComment, getCommentsProduct, putUpdateComment, deleteComment, postVote,getAllProducts } from "../../../services/apiServices";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay, Pagination, Navigation } from "swiper/modules";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ProductPage.scss";
import { BsArrowReturnRight } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
const ProductsPage = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);
    const userState = useSelector((state) => state.user.account);
    // console.log("userstate",userState);
    // Tìm sản phẩm theo ID
    const product = listProducts.find((item) => item._id === id);
    const [listcomment, setListComment] = useState([]);
    const [newComment, setNewCommnet] = useState([]);
    const [userRating, setUserRating] = useState(null);
    const addProductOrder = async (productId) => {
        dispatch({
            type: "add_product",
            payload: productId,
        });

        toast.success("add done");
        // console.log(listProducts);
        console.log(stateProduct);
    };
    const removeProductOrder = async (productId) => {
        dispatch({
            type: "remove_product",
            payload: productId,
        });
        toast.success("remove done");
        // console.log(listProducts);
        // console.log(stateProduct);
    };
    const fetchListComment = async () => {
        let res = await getCommentsProduct(product._id);
        // console.log(res);
        if (res.EC === 0) {
            let sortedComments = res.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setListComment(sortedComments);
            toast.success("get comments done");
        }
        // let res_data = await postLogin("a", "1");
        // if (res_data && res_data.EC === 0) {
        //     dispatch({
        //         type: "fetch_user_login_success",
        //         payload: res_data,
        //     });
        //     toast.success(res_data.MS);
        //     // navigate("/");
        // }
        // if (res_data && res_data.EC !== 0) {
        //     toast.error(res_data.MS);
        //     alert("sai");
        // }
    };

    const onReplyClick = async (commentId, cmt) => {
        let res = await postCreateComment(product._id, userState._id, cmt, commentId);
        // console.log(res);
        if (res.EC === 0) {
            toast.success("get comments done");
        }
        fetchListComment();
        // Thực hiện logic để gọi form reply hoặc bất kỳ hành động nào khác
    };
    const onAddNewComment = async () => {
        let res = await postCreateComment(product._id, userState._id, newComment);
        // console.log(res);
        if (res.EC === 0) {
            toast.success("get comments done");
        }
        setNewCommnet("");
        fetchListComment();
        // Thực hiện logic để gọi form reply hoặc bất kỳ hành động nào khác
    };
    const onRemoveClick = async (commentId) => {
        let res = await deleteComment(commentId);
        // console.log(res);
        if (res.EC === 0) {
            toast.success("get comments done");
        }
        fetchListComment();
        // Thực hiện logic để gọi form reply hoặc bất kỳ hành động nào khác
    };
    useEffect(() => {
        fetchListComment();
    }, []);

    // Kiểm tra xem sản phẩm có tồn tại không
    if (!product) {
        return <div>Product not found</div>;
    }
    // Component Bình luận

    const Comment = ({ comment, commentsMap }) => {
        const [commentInput, setCommentInput] = useState([]);
        return (
            <div style={{ marginLeft: comment.replyFor ? "30px" : "0px", marginBottom: "10px" }} className="commentItem">
                <div className="commentItemContent" style={{ border: "1px solid #ddd", padding: "10px", backgroundColor: "#fff" }}>
                    {comment.replyFor && <BsArrowReturnRight />}
                    <div className="ItemContentTop">
                        <p className="a">
                            <strong>User:</strong> {comment.idUser}
                        </p>
                        {comment.idUser === userState._id && (
                            <div className="tableEdit">
                                <div>
                                    <MdOutlineEdit />
                                </div>
                                <div
                                    onClick={() => {
                                        onRemoveClick(comment._id, commentInput);
                                    }}
                                >
                                    <FaRegTrashAlt />
                                </div>
                            </div>
                        )}
                    </div>

                    <p>{comment.content}</p>
                    <div className="replyinputgroup">
                        <input type="text" className="form-control" placeholder="example comment" value={commentInput} onChange={(event) => setCommentInput(event.target.value)} />
                        <button
                            style={{ backgroundColor: "red" }}
                            onClick={() => {
                                onReplyClick(comment._id, commentInput);
                                setCommentInput("");
                            }}
                            className="btnReply"
                        >
                            Reply
                        </button>
                    </div>
                </div>
                {comment.listReply.length > 0 && (
                    <div className="listReply">
                        {comment.listReply.map((replyId) => (
                            <Comment key={replyId} comment={commentsMap[replyId]} commentsMap={commentsMap} />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Component chính để hiển thị danh sách bình luận
    const CommentsList = ({ comments }) => {
        // Tạo một bản đồ từ các bình luận để dễ dàng truy cập
        const commentsMap = comments.reduce((map, comment) => {
            map[comment._id] = comment;
            return map;
        }, {});

        // Lọc ra các bình luận chính (không phải trả lời của bình luận khác)
        const mainComments = comments.filter((comment) => comment.replyFor === null);

        return (
            <div className="listCommentContent">
                {mainComments.map((comment) => (
                    <Comment key={comment._id} comment={comment} commentsMap={commentsMap} />
                ))}
            </div>
        );
    };
    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_product",
                payload: res.products,
            });
            console.log(listProducts);
            toast.success(res.MS);
        }
    };
    const handleRating = async (rating) => {
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${userState.access_token}`,
            },
        };
        let formData ={
            userId:userState._id,
            rating: rating,
        }
        
        let res_data = await postVote(product._id,formData,config);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            fetchListProducts();
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };
    return (
        <div className="productContainer">
            <div className="productBanner">
                <h1 className="productBannerItem">{product.name}</h1>
            </div>
            <div className="productContent">
                <div className="topContent">
                    <div className="presentImage">
                        <img src={product.presentImage} alt={product.name} />
                    </div>
                    <div className="itemDes">
                        <div className="topItemDes">
                            <h1>{product.name}</h1>
                            <h4>Loại: {product.category.nameCategory}</h4>
                            <h4>Giá bán: {product.sellingprice}</h4>
                            <h4>Số lượng còn lại: {product.count}</h4>
                            <h4>Rate: {product.rate}</h4>
                            <h4>NumberVote: {product.numberVote}</h4>
                            <div>
                            <span>Đánh giá sản phẩm: </span>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} onClick={() => handleRating(star)}>
                                    {star} sao
                                </button>
                            ))}
                        </div>
                            <p className="description">
                                Mô tả : {product.description} 
                            </p>
                        </div>

                        <div className="bottomItemDes">
                            {product.CountOrder === 0 ? (
                                <div className={`addmeBtn`} onClick={() => addProductOrder(product._id)}>
                                    Add me
                                </div>
                            ) : (
                                <div className="SwiperSlideDes_Btn">
                                    <CiCircleMinus onClick={() => removeProductOrder(product._id)} size={30} color="#000" style={{ margin: "20px", fontWeight: 500 }} className="btn_icon" />
                                    <div className={`${product._id} countItem`}> {product.CountOrder}</div>
                                    <CiCirclePlus onClick={() => addProductOrder(product._id)} size={30} color="#000" style={{ margin: "20px", fontWeight: 200 }} className="btn_icon" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bottomContent"></div>
            </div>
            <div className="commentContainer">
                <button className="addNewComment" onClick={()=>onAddNewComment()}>Add new comment</button>
                <input type="text" className="form-control" placeholder="example comment" value={newComment} onChange={(event) => setNewCommnet(event.target.value)} />
                <CommentsList comments={listcomment} />
            </div>
        </div>
    );
};

export default ProductsPage;
