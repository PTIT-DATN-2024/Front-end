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
import "./SpecialBanner.scss";
// import required modules

import _ from "lodash";

const SpecialBanner = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);

    return (
        <>
            <div className="foodBanner">
                <div className="content">
                    <div className="foodBannerItem_text">
                        <div className="item">Save 20%</div>
                        <div className="item">Today's Astackin Day </div>
                    </div>

                    <div className="foodBannerItem_img"></div>
                </div>
            </div>
        </>
    );
};
export default SpecialBanner;
