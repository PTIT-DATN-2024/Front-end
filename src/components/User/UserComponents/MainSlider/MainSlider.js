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
                            <SwiperSlide>
                                <img src="/banner/1.jpg" alt="presentImage" className="SwiperSlideImgItem" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/banner/2.png" alt="presentImage" className="SwiperSlideImgItem" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/banner/3.jpg" alt="presentImage" className="SwiperSlideImgItem" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/banner/4.png" alt="presentImage" className="SwiperSlideImgItem" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/banner/5.jpg" alt="presentImage" className="SwiperSlideImgItem" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/banner/6.jpg" alt="presentImage" className="SwiperSlideImgItem" />
                            </SwiperSlide>
                        </Swiper>
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
                            src="https://hanoicomputercdn.com/media/banner/31_Dec143dfdd45fdb982fd1e20f0ed939b90c.png"
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
                        src="https://hanoicomputercdn.com/media/banner/31_Decfbbd6a541bb89b6cd63977c41351a54b.png"
                        alt="Trùm màn hình Gaming"
                    />
                </a>
                <a href="/productFilterPage" target="_blank" rel="noopener noreferrer" style={{ minHeight: "148px", flex: 1 }}>
                    <img
                        className="item"
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }}
                        src="https://hanoicomputercdn.com/media/banner/31_Decc9ef721cc5051e97f00e9da403a54fbe.png"
                        alt="Trùm Laptop Gaming"
                    />
                </a>
                <a href="/productFilterPage" target="_blank" rel="noopener noreferrer" style={{ minHeight: "148px", flex: 1 }}>
                    <img
                        className="item"
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }}
                        src="https://hanoicomputercdn.com/media/banner/31_Dec6c49f32672603f115bae87cafd270dfd.png"
                        alt="Giải nhiệt máy tính"
                    />
                </a>
            </div>
        </div>
    );
};

export default MainSlider;
