import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay, Pagination, Navigation } from "swiper/modules";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ProductPre.scss";
// import required modules

import _ from "lodash";

const ProductPre = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);
    return (
        <>
            <div className="productPre">
                <Swiper
                    watchSlidesProgress={true}
                    speed={1500}
                    spaceBetween={30}
                    slidesPerView={5}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    breakpoints={{
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                        780: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },

                        480: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        1: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                    }}
                    modules={
                        [
                            // Autoplay
                        ]
                    }
                    className="mySwiper"
                >
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="SwiperSlideImg">
                                        <div className="content">
                                            <img src={product.presentImage} alt="" className="SwiperSlideImgItem"/>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </>
    );
};
export default ProductPre;
