import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./BestSeller.scss";

import { BsCartPlus } from "react-icons/bs";
const BestSeller = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listProducts = useSelector((state) => state.product.listProducts);
    const addProductOrder = async (productId) => {
        dispatch({
            type: "add_product",
            payload: { productId, quantity:1 },
        });
        toast.success("Added to order successfully");
    };
    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return <div className="slick-arrow slick-next" onClick={onClick} style={{ display: "block", color: "black", fontSize: "30px" }}></div>;
    };
    const SamplePrevArrow = (props) => {
        const { onClick } = props;
        return <div className="slick-arrow slick-prev" onClick={onClick} style={{ display: "block", color: "black", fontSize: "30px" }}></div>;
    };
    const settings = {
        dots: false, // Tắt dots
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Hiển thị 6 slide
        slidesToScroll: 1,
        draggable: true,
        swipeToSlide: true,
        autoplay: true, // Thêm autoplay
        autoplaySpeed: 3000, // Tốc độ chuyển slide (3 giây)
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className="ContainerBestSeller">
            <div className="item_sell">
                <h3>TOP LAPTOP BÁN CHẠY NHẤT 2024</h3>
                <Slider {...settings}>
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => (
                            <div key={index} onClick={() => navigate(`/productsPage/${product._id}`)}  class="productSlide">
                                <div class="p-img">
                                    <img src={product.presentImage} alt="Laptop Asus VivoBook X1404ZA-NK386W&nbsp;(i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)" />
                                </div>
                                <div class="p-rate">
                                    <span class="p-count-rate">{product.rate}</span>
                                    <span class="p-count-rate">({product.numberVote})</span>
                                    <p class="p-sku">Mã: LTAU861</p>
                                </div>
                                <div class="p-info">
                                    <p class="p-name">{product.name}</p>
                                    <span class="p-discount"> (Tiết kiệm: 19% )</span>
                                    <span class="p-price"> {product.sellingprice.toLocaleString("vi-VN") + " đ"}</span>
                                </div>
                                <div class="p-action">
                                    <span class="p-qty">Sẵn hàng</span>

                                    <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductOrder(product._id,1)} />
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
            <div className="item_sell">
                <h3>TOP LAPTOP BÁN CHẠY NHẤT 2024</h3>
                <Slider {...settings}>
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => (
                            <div key={index} onClick={() => navigate(`/productsPage/${product._id}`)}  class="productSlide">
                                <div class="p-img">
                                    <img src={product.presentImage} alt="Laptop Asus VivoBook X1404ZA-NK386W&nbsp;(i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)" />
                                </div>
                                <div class="p-rate">
                                    <span class="p-count-rate">{product.rate}</span>
                                    <span class="p-count-rate">({product.numberVote})</span>
                                    <p class="p-sku">Mã: LTAU861</p>
                                </div>
                                <div class="p-info">
                                    <p class="p-name">{product.name}</p>
                                    <span class="p-discount"> (Tiết kiệm: 19% )</span>
                                    <span class="p-price"> {product.sellingprice.toLocaleString("vi-VN") + " đ"}</span>
                                </div>
                                <div class="p-action">
                                    <span class="p-qty">Sẵn hàng</span>

                                    <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductOrder(product._id)} />
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
            <div className="item_sell">
                <h3>TOP LAPTOP BÁN CHẠY NHẤT 2024</h3>
                <Slider {...settings}>
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => (
                            <div key={index} onClick={() => navigate(`/productsPage/${product._id}`)}  class="productSlide">
                                <div class="p-img">
                                    <img src={product.presentImage} alt="Laptop Asus VivoBook X1404ZA-NK386W&nbsp;(i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)" />
                                </div>
                                <div class="p-rate">
                                    <span class="p-count-rate">{product.rate}</span>
                                    <span class="p-count-rate">({product.numberVote})</span>
                                    <p class="p-sku">Mã: LTAU861</p>
                                </div>
                                <div class="p-info">
                                    <p class="p-name">{product.name}</p>
                                    <span class="p-discount"> (Tiết kiệm: 19% )</span>
                                    <span class="p-price"> {product.sellingprice.toLocaleString("vi-VN") + " đ"}</span>
                                </div>
                                <div class="p-action">
                                    <span class="p-qty">Sẵn hàng</span>

                                    <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductOrder(product._id)} />
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
            <div className="item_sell">
                <h3>TOP LAPTOP BÁN CHẠY NHẤT 2024</h3>
                <Slider {...settings}>
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => (
                            <div key={index} onClick={() => navigate(`/productsPage/${product._id}`)}  class="productSlide">
                                <div class="p-img">
                                    <img src={product.presentImage} alt="Laptop Asus VivoBook X1404ZA-NK386W&nbsp;(i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)" />
                                </div>
                                <div class="p-rate">
                                    <span class="p-count-rate">{product.rate}</span>
                                    <span class="p-count-rate">({product.numberVote})</span>
                                    <p class="p-sku">Mã: LTAU861</p>
                                </div>
                                <div class="p-info">
                                    <p class="p-name">{product.name}</p>
                                    <span class="p-discount"> (Tiết kiệm: 19% )</span>
                                    <span class="p-price"> {product.sellingprice.toLocaleString("vi-VN") + " đ"}</span>
                                </div>
                                <div class="p-action">
                                    <span class="p-qty">Sẵn hàng</span>

                                    <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductOrder(product._id)} />
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>

        </div>
    );
};

export default BestSeller;
