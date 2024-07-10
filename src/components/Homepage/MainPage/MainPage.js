import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllCategories, getAllProducts } from "../../../services/apiServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./styles.css";
// import required modules
import "./MainPage.scss";
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
        fetchListProducts();
        fetchListCategories();
        console.log("fetchListProducts", listProducts);
        console.log("fetchListcate", listCategories);
    }, []);
    return (
        <>
            <div className="topWrapper">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => {
                            return (
                                <SwiperSlide>
                                    <div className="SwiperSlideDes">
                                        <div className="SwiperSlideDes_item">{product.name} </div>
                                        <div className="SwiperSlideDes_item">Description</div>
                                        <div className="SwiperSlideDes_item">More</div>
                                    </div>
                                    <div className="SwiperSlideImg"></div>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
            <div className="categoryBanner">
                <div>CATEGORY LIST</div>
                <Swiper
                    watchSlidesProgress={true}
                    spaceBetween={30}
                    slidesPerView={5}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                    // centeredSlides={true}
                    // autoplay={{
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {listCategories &&
                        listCategories.length > 0 &&
                        listCategories.map((category, index) => {
                            return (
                                <SwiperSlide>
                                    <div className="SwiperSlideImg"></div>
                                    <div className="SwiperSlideName">{category.name} </div>
                                    <div className="SwiperSlideCount">{category._id} </div>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>

            <div className="foodBanner">Food Banner</div>
            <div className="brandWrapper">brandWrapper</div>
            <div className="gridBanner">Grid banner </div>
            <div className="tableProduct">Product</div>
            <div className="comboBanner">Combo Baner</div>
            <div className="chooseUs">Choose us</div>
            <div className="thankWrapper">thank slice</div>
            <div className="productPre">Product full slice</div>
            <footer>footer</footer>
        </>
    );
};
export default MainPage;
