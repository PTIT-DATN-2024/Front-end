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
import { getCartbyUserid } from "../../../services/apiServices";
const MainPage = (props) => {

    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user.account);
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);
    const userCart = useSelector((state) => state.cart.cartItems);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_product",
                payload: res.products.filter(product => product.isDelete === "False"),
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
    const fetchCart = async () => {
        let res = await getCartbyUserid(userState.id);
        if (res.EC === 0) {
            dispatch({
                type: "FETCH_CART_SUCCESS",
                payload: res,
            });
        }
    };

    useEffect(() => {
        if (_.isEmpty(listProducts)) {
            fetchListProducts();
        }
        if (_.isEmpty(listCategories)) {
            fetchListCategories();
        }
        fetchCart();
    }, []);

    return (
        <>
            <MainSlider/>
            <UnderMainSlider/>
            <CategoryBanner />
            <BestSeller/>
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
