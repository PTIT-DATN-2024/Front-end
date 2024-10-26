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
import MainSlider from "../HPComponents/MainSlider/MainSlider";
import UnderMainSlider from "../HPComponents/UnderMainSlider/UnderMainSlider";
import CategoryBanner from "../HPComponents/CategoryBanner/CategoryBanner";
import ProductPre from "../HPComponents/ProductPre/ProductPre";
import GridBanner from "../HPComponents/GridBanner/GridBanner";
import SpecialBanner from "../HPComponents/SpecialBanner/SpecialBanner";
import TableProductPre from "../HPComponents/TableProduct/TableProductPre";
import ComboBanner from "../HPComponents/ComboBanner/ComboBanner";
import Choosing from "../HPComponents/Choosing/Choosing";
import ThankSlice from "../HPComponents/ThankSlice/ThankSlice";
import BestSeller from "../HPComponents/BestSeller/BestSeller";
import ThankCustomer from "../HPComponents/ThankCustomer/ThankCustomer";
const MainPage = (props) => {

    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);
    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_product",
                payload: res.products,
            });
            console.log(listProducts);
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
