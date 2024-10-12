import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { postCreateComment, getCommentsProduct, putUpdateComment, deleteComment, postVote, getAllProducts } from "../../../services/apiServices";
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
import { BsCartCheck } from "react-icons/bs";
import TableProductFull from "../HPComponents/TableProduct/TableProductFull";
import TopWrapper from "../HPComponents/TopWrapper/TopWrapper";
import CategoryBanner from "../HPComponents/CategoryBanner/CategoryBanner";
import ProductPre from "../HPComponents/ProductPre/ProductPre";
import GridBanner from "../HPComponents/GridBanner/GridBanner";
import SpecialBanner from "../HPComponents/SpecialBanner/SpecialBanner";
import TableProductPre from "../HPComponents/TableProduct/TableProductPre";
import ComboBanner from "../HPComponents/ComboBanner/ComboBanner";
import Choosing from "../HPComponents/Choosing/Choosing";
import ThankSlice from "../HPComponents/ThankSlice/ThankSlice";
import CommentProduct from "../HPComponents/CommentProduct/CommentProduct";
import { FaStar } from "react-icons/fa";
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

    if (!product) {
        return <div>Product not found</div>;
    }
    const handleRating = async (rating) => {
        setUserRating(rating);
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${userState.access_token}`,
            },
        };
        let formData = {
            userId: userState._id,
            rating: rating,
        };

        let res_data = await postVote(product._id, formData, config);
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
                        <div className="content">
                            <img src={product.presentImage} alt={product.name} className="img" />
                        </div>
                    </div>
                    <div className="itemDes">
                        <div className="topItemDes">
                            {/* <h1>{product.name}</h1> */}
                            <div className="voteStar">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar key={star} onClick={() => handleRating(star)} 
                                    color={star <= userRating ? "#ffc107" : "#e4e5e9"}          className="voteStarItem" />
                                ))}
                            </div>
                            {/* <h4>NumberVote: {product.numberVote}</h4> */}
                            <h4>Rate: {product.rate}</h4>
                            <h4>Loại: {product.category.nameCategory}</h4>
                            <h4>Số lượng còn lại: {product.count}</h4>
                            <h4>Giá: {product.sellingprice}</h4>
                            <div className="description">Mô tả : {product.description}</div>
                        </div>

                        <div className="bottomItemDes">
                            {product.CountOrder === 0 ? (
                                <div className={`addmeBtn`} onClick={() => addProductOrder(product._id)}>
                                    <BsCartCheck size={30} style={{ color: "#212121" }} />
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
            {/* <CommentProduct productId={id}/>                 */}
            <SpecialBanner />
            <GridBanner />
            <ComboBanner />
        </div>
    );
};

export default ProductsPage;
