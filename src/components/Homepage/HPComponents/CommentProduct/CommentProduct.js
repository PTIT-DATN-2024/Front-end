import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { postCreateComment, getCommentsProduct, deleteComment,getAllProducts } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CommentProduct.scss";
import { BsArrowReturnRight } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
const CommentProduct = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);
    const userState = useSelector((state) => state.user.account);
    const product = listProducts.find((item) => item._id === props.productId);
    // console.log("userstate",userState);
    // Tìm sản phẩm theo ID
    const [listcomment, setListComment] = useState([]);
    const [newComment, setNewCommnet] = useState([]);

    const fetchListComment = async () => {
        let res = await getCommentsProduct(props.productId);
        // console.log(res);
        if (res.EC === 0) {
            let sortedComments = res.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setListComment(sortedComments);
            // toast.success("get comments done");
        }
    };
    const onReplyClick = async (commentId, cmt) => {
        let res = await postCreateComment(product._id, userState._id, cmt, commentId);
        // console.log(res);
        if (res.EC === 0) {
            // toast.success("get comments done");
        }
        fetchListComment();
    };
    const onAddNewComment = async () => {
        let res = await postCreateComment(product._id, userState._id, newComment);
        // console.log(res);
        if (res.EC === 0) {
            // toast.success("get comments done");
        }
        setNewCommnet("");
        fetchListComment();
    };
    const onRemoveClick = async (commentId) => {
        let res = await deleteComment(commentId);
        // console.log(res);
        if (res.EC === 0) {
            toast.success("get comments done");
        }
        fetchListComment();
    };
    useEffect(() => {
        fetchListComment();
    }, []);
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

    return (
        <div className="commentContainer">
            <button className="addNewComment" onClick={() => onAddNewComment()}>
                Add new comment
            </button>
            <input type="text" className="form-control" placeholder="example comment" value={newComment} onChange={(event) => setNewCommnet(event.target.value)} />
            <CommentsList comments={listcomment} />
        </div>
    );
};

export default CommentProduct;
