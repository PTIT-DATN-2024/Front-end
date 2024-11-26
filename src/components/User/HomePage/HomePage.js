import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllCategories, getAllProducts } from "../../../services/apiServices";
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
// import "./styles.css";
// import required modules
import "./HomePage.scss";
import _ from "lodash";
import MainSlider from "../UserComponents/MainSlider/MainSlider";
import UnderMainSlider from "../UserComponents/UnderMainSlider/UnderMainSlider";
import CategoryBanner from "../UserComponents/CategoryBanner/CategoryBanner";
import ProductPre from "../UserComponents/ProductPre/ProductPre";
import GridBanner from "../UserComponents/GridBanner/GridBanner";
import SpecialBanner from "../UserComponents/SpecialBanner/SpecialBanner";
import TableProductPre from "../UserComponents/TableProduct/TableProductPre";
import ComboBanner from "../UserComponents/ComboBanner/ComboBanner";
import Choosing from "../UserComponents/Choosing/Choosing";
import ThankSlice from "../UserComponents/ThankSlice/ThankSlice";
import BestSeller from "../UserComponents/BestSeller/BestSeller";
import ThankCustomer from "../UserComponents/ThankCustomer/ThankCustomer";
const MainPage = (props) => {

    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_product",
                payload: res.products,
            });
            console.log(listProducts);

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
    const updateStateOrder = () => {
        dispatch({
            type: "Update_order_user",
            payload: listProducts,
        });
    };
    useEffect(() => {
        if (_.isEmpty(listProducts)) {
            fetchListProducts();
            // updateStateOrder()
        }
        if (_.isEmpty(listCategories)) {
            fetchListCategories();
        }
    }, []);
    useEffect(() => {
        updateStateOrder();
    }, [listProducts]);
    return (
        <>
            <MainSlider/>
            <UnderMainSlider/>
            <BestSeller/>
            <CategoryBanner />
            <TableProductPre/>
            {/* <GridBanner />
            <SpecialBanner />
            <ProductPre /> */}
            {/* <ThankCustomer/> */}
            {/* <ComboBanner/> */}
            {/* <Choosing/> */}
            {/* <ThankSlice/> */}
        </>
    );
};
export default MainPage;
