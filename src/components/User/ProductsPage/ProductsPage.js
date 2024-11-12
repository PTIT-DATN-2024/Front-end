import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
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
import TableProductFull from "../UserComponents/TableProduct/TableProductFull";
import TopWrapper from "../UserComponents/MainSlider/MainSlider";
import CategoryBanner from "../UserComponents/CategoryBanner/CategoryBanner";
import ProductPre from "../UserComponents/ProductPre/ProductPre";
import GridBanner from "../UserComponents/GridBanner/GridBanner";
import SpecialBanner from "../UserComponents/SpecialBanner/SpecialBanner";
import TableProductPre from "../UserComponents/TableProduct/TableProductPre";
import ComboBanner from "../UserComponents/ComboBanner/ComboBanner";
import Choosing from "../UserComponents/Choosing/Choosing";
import ThankSlice from "../UserComponents/ThankSlice/ThankSlice";
import CommentProduct from "../UserComponents/CommentProduct/CommentProduct";
import { FaStar } from "react-icons/fa";
const ProductsPage = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const userState = useSelector((state) => state.user.account);
    const listProducts = useSelector((state) => state.product.listProducts);
    const product = listProducts.find((item) => item._id === id);
    const [quantity, setQuantity] = useState(1);
    const stateOrder = useSelector((state) => state.listOrder);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchListProducts();
        updateStateOrder();
    }, []);
    useEffect(() => {
        updateStateOrder();
    }, [listProducts]);
    const updateStateOrder = () => {
        dispatch({
            type: "Update_order_user",
            payload: listProducts,
        });
    };
    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_product",
                payload: res.products,
            });
            console.log(listProducts);
            console.log(stateOrder);

        }
    };
    const addProductOrder = async (productId, quantity) => {
        dispatch({
            type: "add_product_to_order",
            payload: { productId, quantity },
        });
        setQuantity(1);
        toast.success("Added to order successfully");
        console.log(stateOrder);
    };
    const removeProductOrder = async (productId) => {
        dispatch({
            type: "remove_product_from_order",
            payload: productId,
        });
        toast.success("remove done");
    };
    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
    const handleAddToCart = () => addProductOrder(product._id, quantity);
    const buyNow = (productId) => {
        addProductOrder(product._id, quantity);

        if (userState.role === 'STAFF') {

            navigate('/staffs');
        } else {
            navigate("/PayPage");
        }


    };
    const settings = {
        dots: false, // Tắt dots
        infinite: true,
        speed: 300,
        slidesToShow: 1, // Hiển thị 1 slide
        slidesToScroll: 1,
        draggable: true,
        swipeToSlide: true,
        autoplay: true, // Thêm autoplay
        autoplaySpeed: 3000, // Tốc độ chuyển slide (3 giây)
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />,
    };
    const images = Array.isArray(product.presentImage) ? product.presentImage : product.presentImage ? [product.presentImage] : []; // Chuyển đổi thành mảng nếu là chuỗi
    if (!product) {
        return <div>Product not found</div>;
    }
    return (
        <div className="productContainer">
            <div className="pd-info-container">
                <div className="pd-info-left">
                    <div className="pd-img-gallery">
                        {images.length > 0 &&
                            images.map((imgItem, index) => (
                                <div className="p-img" key={index}>
                                    <img src={imgItem} alt={`Laptop Asus VivoBook X1404ZA-NK386W (i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)`} />
                                </div>
                            ))}
                        {images.length > 0 &&
                            images.map((imgItem, index) => (
                                <div className="p-img" key={index}>
                                    <img src={imgItem} alt={`Laptop Asus VivoBook X1404ZA-NK386W (i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)`} />
                                </div>
                            ))}
                    </div>

                    <div className="pd-big-image">
                        <div className="pd-list-img">
                            {/* <Slider {...settings}> */}
                            {images.length > 0 &&
                                images.map((imgItem, index) => (
                                    <div className="p-img" key={index}>
                                        <img src={imgItem} alt={`Laptop Asus VivoBook X1404ZA-NK386W (i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)`} />
                                    </div>
                                ))}
                            {/* </Slider> */}
                        </div>

                        <div className="pd-image-btn">
                            <div className="box">
                                <a href="" className="item item-image js-box-open-gallery">
                                    <span className="item-icon lazy" style={{ backgroundImage: `url(${product.presentImage})` }}></span>

                                    <span className="item-text">
                                        Hình ảnh chụp
                                        <br />
                                        sản phẩm
                                    </span>
                                </a>

                                <a href="https://www.youtube.com/watch?v=u5r6RbBESw4" data-fancybox className="item item-video" target="_blank" rel="noopener noreferrer">
                                    <span className="item-icon">
                                        <i className="fab fa-youtube"></i>
                                    </span>
                                    <span className="item-text">
                                        Video
                                        <br />
                                        sản phẩm
                                    </span>
                                </a>

                                <a href="" className="item item-product-spec">
                                    <span className="item-icon">
                                        <i className="fal fa-clipboard-list-check tada" style={{ color: "#2d2c74" }}></i>
                                    </span>
                                    <span className="item-text">
                                        Thông số
                                        <br />
                                        kỹ thuật
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pd-info-right">
                    {/* ten  */}
                    <h1 className="sptitle2024">{product.name}</h1>
                    {/* danh gia  */}
                    <div className="pd-status-group">
                        <p>
                            Mã SP: <b className="blue">LTAU811</b>
                        </p>
                        <p style={{ cursor: "pointer" }}>
                            Đánh giá:{" "}
                            <b className="blue">
                                {product.rate} {product.numberVote}
                            </b>
                        </p>
                        <p style={{ cursor: "pointer" }}>
                            Bình luận: <b className="blue">0</b>
                        </p>
                        <p>
                            Lượt xem: <b className="blue">28.084</b>
                        </p>
                    </div>
                    {/* thong so  */}
                    <div className="pd-summary-group" id="js-pd-summary">
                        <p className="group-title">Thông số sản phẩm</p>
                        <div>
                            <div className="item">CPU: AMD Ryzen™ R5 7520U</div>
                            <div className="item">Ram: 16GB LPDDR5 (hàn liền)</div>
                            <div className="item">Ổ cứng: 512GB M.2 NVMe™</div>
                            <div className="item">VGA: AMD Radeon™ Graphics</div>
                            <div className="item">Display: 14 inch FHD (1920 x 1080) 16:9, LED, 60Hz, 250nits, 45% NTSC</div>
                            <div className="item">HĐH: Win 11 Home</div>
                            <div className="item">Màu: Bạc</div>
                        </div>
                    </div>
                    {/* giá  */}
                    <div className="pd-price-group">
                        <div className="pd-special-price">
                            <div className="left">
                                <p className="pd-price" data-price="11999000">
                                    {product.sellingprice.toLocaleString("vi-VN")}
                                    <u>đ</u>
                                </p>
                                <p>
                                    Tiết kiệm: 2.500.000<u>đ</u>
                                </p>
                            </div>
                            <del className="pd-market-price">
                                {"Giá gốc " + product.sellingprice.toLocaleString("vi-VN")}
                                <u>đ</u>
                            </del>
                        </div>

                        <div className="pd-warranty-group">
                            <p>Giá đã bao gồm VAT</p>
                            <p>Bảo hành: 24 Tháng (Pin 12 Tháng)</p>
                        </div>
                    </div>
                    {/* soluon + add to cart  */}

                    <div className="pd-quantity-group">
                        <span>Số lượng</span>
                        <div className="pd-quantity-change">
                            <button onClick={handleDecrease}>-</button>
                            <span>{quantity}</span>
                            <button onClick={handleIncrease}>+</button>
                        </div>
                        <button onClick={handleAddToCart} className="addToCart">
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                    {/* mua  */}
                    <div className="pd-btn-group">
                        <div className="pd-buy-now" onClick={buyNow}>
                            <b>mua ngay</b>
                            <span>Giao nhanh tận nơi, miễn phí toàn quốc</span>
                        </div>
                    </div>
                </div>
            </div>
            <CommentProduct productId={product._id} />
        </div>
    );
};

export default ProductsPage;
