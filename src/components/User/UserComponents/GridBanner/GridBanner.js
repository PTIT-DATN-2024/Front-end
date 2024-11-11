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
import "./GridBanner.scss";
import _ from "lodash";
const GridBanner = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);

    return (
        <>
            <div className="gridBanner">
                <div className="contentLeft">
                    <div className="itemTop itemHover">
                        <div className="itemScale"></div>
                        {/* <img src="../../../../assets/image/product/bobittet.jpg" alt="" className="itemImg" /> */}
                    </div>
                    <div className="itemBottom itemHover">
                        {/* <img src="../../../../assets/image/product/comtho.png" alt="" className="itemImg" /> */} <div className="itemScale"></div>
                    </div>
                </div>
                <div className="contentRight">
                    <div className="itemTop itemHover">
                        {/* <img src="../../../../assets/image/product/bobittet.jpg" alt="" className="itemImg" /> */} <div className="itemScale"></div>
                    </div>
                    <div className="itemBottom">
                        <div className="childLeft itemHover">
                            {/* <img src="../../../../assets/image/product/comtho.png" alt="" className="itemImg" /> */} <div className="itemScale"></div>
                        </div>
                        <div className="childRight itemHover">
                            {/* <img src="../../../../assets/image/product/micay.jpg" alt="" className="itemImg" /> */} <div className="itemScale"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default GridBanner;
