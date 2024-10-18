import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./BestSeller.scss";

const BestSeller = (props) => {
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);
    // Custom next arrow

    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return <div className="slick-arrow slick-next" onClick={onClick} style={{ display: "block", color: "black", fontSize: "30px" }}></div>;
    };

    // Custom previous arrow
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
                            <div key={index} className="">
                                <div className="SwiperSlideImg">
                                    <img src={product.presentImage} alt="presentImage" className="SwiperSlideImgItem" />
                                </div>
                                <div className="SwiperSlideDes">
                                    <div className="SwiperSlideDes_item name">{product.name}</div>
                                    <div className="SwiperSlideDes_item desc">{product.description}</div>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
            <div className="item_sell">
                <h3>TOP BÀN PHÍM ĐƯỢC ƯA CHUỘNG NHẤT</h3>
                <Slider {...settings}>
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => (
                            <div key={index} className="">
                                <div className="SwiperSlideImg">
                                    <img src={product.presentImage} alt="presentImage" className="SwiperSlideImgItem" />
                                </div>
                                <div className="SwiperSlideDes">
                                    <div className="SwiperSlideDes_item name">{product.name}</div>
                                    <div className="SwiperSlideDes_item desc">{product.description}</div>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
            <div className="item_sell">
                <h3>NHỮNG MÀN HÌNH BEST SELLER</h3>
                <Slider {...settings}>
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => (
                            <div key={index} className="">
                                <div className="SwiperSlideImg">
                                    <img src={product.presentImage} alt="presentImage" className="SwiperSlideImgItem" />
                                </div>
                                <div className="SwiperSlideDes">
                                    <div className="SwiperSlideDes_item name">{product.name}</div>
                                    <div className="SwiperSlideDes_item desc">{product.description}</div>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
            <div className="item_sell">
                <h3>TOP TAI NGHE GAMING TỐT NHẤT</h3>
                <Slider {...settings}>
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => (
                            <div key={index} className="">
                                <div className="SwiperSlideImg">
                                    <img src={product.presentImage} alt="presentImage" className="SwiperSlideImgItem" />
                                </div>
                                <div className="SwiperSlideDes">
                                    <div className="SwiperSlideDes_item name">{product.name}</div>
                                    <div className="SwiperSlideDes_item desc">{product.description}</div>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>

        </div>
    );
};

export default BestSeller;
