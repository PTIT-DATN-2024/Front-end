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
import "./UnderMainSlider.scss";

const UnderMainSlider = (props) => {
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);

    return (
        <div className="banner-duoi-slider" style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "132px", gap: "10px" }}>
                <a href="/ad.php?id=1714" target="_blank" rel="noopener noreferrer" style={{ minHeight: "124px", flex: 1 }}>
                    <img
                        className="item"
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover"}}
                        src="https://hanoicomputercdn.com/media/banner/27_Augf3ccdd27d2000e3f9255a7e3e2c48800.jpg"
                        alt="Trùm màn hình Gaming"
                    />
                </a>
                <a href="/ad.php?id=1812" target="_blank" rel="noopener noreferrer" style={{ minHeight: "124px", flex: 1 }}>
                    <img
                        className="item"
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover"}}
                        src="https://hanoicomputercdn.com/media/banner/27_Aug156005c5baf40ff51a327f1c34f2975b.jpg"
                        alt="Trùm Laptop Gaming"
                    />
                </a>
                <a href="/ad.php?id=1897" target="_blank" rel="noopener noreferrer" style={{ minHeight: "124px", flex: 1 }}>
                    <img
                        className="item"
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover"}}
                        src="https://hanoicomputercdn.com/media/banner/27_Aug8e09af3580115f1f73b0168d65dcf897.jpg"
                        alt="Giải nhiệt máy tính"
                    />
                </a>
                <a href="/ad.php?id=1897" target="_blank" rel="noopener noreferrer" style={{ minHeight: "124px", flex: 1 }}>
                    <img
                        className="item"
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover"}}
                                            src="https://hanoicomputercdn.com/media/banner/27_Augd0096ec6c83575373e3a21d129ff8fef.jpg"
                        alt="Giải nhiệt máy tính"
                    />
                </a>
            </div>

    );
};

export default UnderMainSlider;
