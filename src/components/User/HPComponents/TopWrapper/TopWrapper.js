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
import "./TopWrapper.scss";
// import required modules

import _ from "lodash";

const TopWrapper = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);

    return (
        <div className="topWrapper">
            <Swiper
                speed={800}
                spaceBetween={0}
                slidesPerView={1}
                // onSlideChange={() => console.log("slide change")}
                // onSwiper={(swiper) => console.log(swiper)}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
                // pagination={{
                //     clickable: true,
                // }}
                // navigation={true}
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
                            <SwiperSlide>
                                <div className="SwiperSlideDes">
                                    <div className="SwiperSlideDes_item name">{product.name} </div>
                                    <div className="SwiperSlideDes_item desc">{product.description}</div>
                                </div>

                                <div className="SwiperSlideImg">
                                    <div className="content">
                                        <img src={product.presentImage} alt="presentImage" className="SwiperSlideImgItem" />
                                    </div>
                                </div>
                            </SwiperSlide>
                                
                        );
                    })}
            </Swiper>
        </div>
    );
};
export default TopWrapper;
