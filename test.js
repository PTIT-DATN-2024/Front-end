import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay, Pagination, Navigation } from "swiper/modules";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./TableProductPre.scss";
import _ from "lodash";
import Slider from "react-slick";

const TableProductPre = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);

    const addProductOrder = (productId) => {
        dispatch({ type: "add_product", payload: productId });
        toast.success("Product added to order.");
    };

    const removeProductOrder = (productId) => {
        dispatch({ type: "remove_product", payload: productId });
        toast.success("Product removed from order.");
    };

    const settings = {
        dots: false, // Tắt dots
        infinite: true,
        speed: 500,
        slidesToShow: 6, // Hiển thị 6 slide
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className="tableProduct">
            <Slider {...settings}>
                {/* {listProducts &&
                    listProducts.map((product, index) => (
                        <div key={index} className="productSlide">
                            <div onClick={() => navigate(`/productsPage/${product._id}`)} className="topItem">
                                <img src={product.presentImage} alt="presentImage" className="SwiperSlideImgItem" />
                                <div className="SwiperSlideDes">
                                    <div className="SwiperSlideDes_Name">{product.name}</div>
                                    <div className="SwiperSlideDes_Price">{product.sellingprice.toLocaleString("vi-VN") + " đ"}</div>
                                </div>
                            </div>
                            <div className="bottomItem">
                                {product.CountOrder === 0 ? (
                                    <div className="addmeBtn" onClick={() => addProductOrder(product._id)}>
                                        <BsCartPlus size={30} style={{ color: "#212121" }} />
                                    </div>
                                ) : (
                                    <div className="SwiperSlideDes_Btn">
                                        <CiCircleMinus onClick={() => removeProductOrder(product._id)} size={30} color="#000" />
                                        <div className="countItem">{product.CountOrder}</div>
                                        <CiCirclePlus onClick={() => addProductOrder(product._id)} size={30} color="#000" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))} */}


            </Slider>
            <div className="tableProductMore" onClick={() => navigate("/productFilterPage")}>
                More Products
            </div>
        </div>
    );
};

// Custom next arrow
const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="slick-arrow slick-next" onClick={onClick}>
            ➔
        </div>
    );
};

// Custom previous arrow
const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="slick-arrow slick-prev" onClick={onClick}>
            ➔
        </div>
    );
};

export default TableProductPre;
