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
import "./CategoryBanner.scss";
// import required modules

import _ from "lodash";
const CategoryBanner = (props) => {
    const navigate = useNavigate();
    const listCategories = useSelector((state) => state.category.listCategories);
    const handleCategoryClick = (categoryId) => {
        navigate('/productFilterPage', { state: { categoryFilter: categoryId } });
    };
    return (
        <>
            <div className="categoryBanner">
                {/* <div className="categoryBanner_header">Danh mục</div> */}
                <Swiper
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
                    {listCategories &&
                        listCategories.length > 0 &&
                        listCategories.map((category, index) => {
                            return (
                                <SwiperSlide key={index} onClick={() => handleCategoryClick(category.categoryId)}>
                                    <div className="SwiperSlideImg">
                                        <div className="content">
                                            <img src={category?.avatar ? category.avatar : ""} alt="presentImage" className="SwiperSlideImgItem" />
                                        </div>
                                    </div>
                                    <div className="SwiperSlideName">{category.name} </div>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </>
    );
};

export default CategoryBanner;
