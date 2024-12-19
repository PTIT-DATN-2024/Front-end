import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./MainSlider.scss";

const MainSlider = (props) => {
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);

    return (
        <div className="homepage_slider">
            <div className="home_slider_top">
                <div className="home_slider">
                    <Swiper
                        speed={800}
                        spaceBetween={0}
                        slidesPerView={1}
                        centeredSlides={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {listProducts &&
                            listProducts.length > 0 &&
                            listProducts.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <div className="SwiperSlideDes">
                                        <div className="SwiperSlideDes_item name">{product.name}</div>
                                        <div className="SwiperSlideDes_item desc">{product.description}</div>
                                    </div>
                                    <div className="SwiperSlideImg">
                                        <div className="content">
                                            <img src="http://localhost:8080/uploads/products/laptop1.jpg" alt="presentImage" className="SwiperSlideImgItem" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
                <div className="home_slider_right" style={{ display: "flex", justifyContent: "space-between", gap: "10px", width: "1180px", height: "480px" }}>
                    <a href="/productFilterPage" target="_blank" rel="noopener noreferrer" style={{ minHeight: "148px", flex: 1 }}>
                        <img
                            className="item"
                            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }}
                            src="https://hanoicomputercdn.com/media/banner/10_Sep721ed348f1492afb77baf89effd91b58.jpg"
                            alt="PC Build"
                        />
                    </a>
                    <a href="/productFilterPage" target="_blank" rel="noopener noreferrer" style={{ minHeight: "148px", flex: 1 }}>
                        <img
                            className="item"
                            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }}
                            src="https://hanoicomputercdn.com/media/banner/10_Sep721ed348f1492afb77baf89effd91b58.jpg"
                            alt="PC Build"
                        />
                    </a>
                </div>
            </div>
            <div className="home_slider_bottom" style={{ display: "flex", justifyContent: "space-between", gap: "10px", width: "1180px", height: "240px" }}>
                <a href="/productFilterPage" target="_blank" rel="noopener noreferrer" style={{ minHeight: "148px", flex: 1 }}>
                    <img
                        className="item"
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }}
                        src="https://hanoicomputercdn.com/media/banner/10_Sep116696eadb1e7697222f78d3293e6a2a.jpg"
                        alt="Trùm màn hình Gaming"
                    />
                </a>
                <a href="/productFilterPage" target="_blank" rel="noopener noreferrer" style={{ minHeight: "148px", flex: 1 }}>
                    <img
                        className="item"
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }}
                        src="https://hanoicomputercdn.com/media/banner/10_Sep2e9564d2be8efdff708edcdc079caae6.jpg"
                        alt="Trùm Laptop Gaming"
                    />
                </a>
                <a href="/productFilterPage" target="_blank" rel="noopener noreferrer" style={{ minHeight: "148px", flex: 1 }}>
                    <img
                        className="item"
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }}
                        src="https://hanoicomputercdn.com/media/banner/10_Sep14c88517e6c3cd4d6d3f8d213c784774.jpg"
                        alt="Giải nhiệt máy tính"
                    />
                </a>
            </div>
        </div>
    );
};

export default MainSlider;
