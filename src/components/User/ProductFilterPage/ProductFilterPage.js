import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllCategories, getAllProducts } from "../../../services/apiServices";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay, Pagination, Navigation } from "swiper/modules";
import { NavLink, useNavigate } from "react-router-dom";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ProductFilterPage.scss";
import _ from "lodash";
import axios from "axios";
import TableProductFull from "../HPComponents/TableProduct/TableProductFull";
import TopWrapper from "../HPComponents/MainSlider/MainSlider";
import CategoryBanner from "../HPComponents/CategoryBanner/CategoryBanner";
import ProductPre from "../HPComponents/ProductPre/ProductPre";
import GridBanner from "../HPComponents/GridBanner/GridBanner";
import SpecialBanner from "../HPComponents/SpecialBanner/SpecialBanner";
import TableProductPre from "../HPComponents/TableProduct/TableProductPre";
import ComboBanner from "../HPComponents/ComboBanner/ComboBanner";
import Choosing from "../HPComponents/Choosing/Choosing";
import ThankSlice from "../HPComponents/ThankSlice/ThankSlice";
import { useLocation } from 'react-router-dom';
const ProductFilterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);
    const location = useLocation();
    const categoryFilter = location.state?.categoryFilter || null;
    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_product",
                payload: res.products,
            });
            toast.success(res.MS);
        }
    };
    const fetchListCategories = async () => {
        let res = await getAllCategories();
        // console.log(res);
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_category",
                payload: res.categories,
            });
            // toast.success(res.MS);
            // console.log(res.categories);
        }
    };

    useEffect(() => {
        if (_.isEmpty(listProducts)) {
            fetchListProducts();
        }
        if (_.isEmpty(listCategories)) {
            fetchListCategories();
        }
    }, []);
    return (
        <>
            <TableProductFull categoryFilter={categoryFilter}/>
            <GridBanner />
            <SpecialBanner />
            <ComboBanner/>
        </>
    );
};
export default ProductFilterPage;
