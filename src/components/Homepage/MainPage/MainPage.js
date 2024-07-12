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
import "./MainPage.scss";
import _ from "lodash";
const MainPage = (props) => {
    const dispatch = useDispatch();
    const stateProduct = useSelector((state) => state.product);
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

    const addProductOrder = async (productId) => {
        dispatch({
            type: "add_product",
            payload: productId,
        });

        toast.success("add done");
        // console.log(listProducts);
        console.log(stateProduct);
    };
    const removeProductOrder = async (productId) => {
        dispatch({
            type: "remove_product",
            payload: productId,
        });
        toast.success("remove done");
        // console.log(listProducts);
        console.log(stateProduct);
    };

    useEffect(() => {
        if (_.isEmpty(listProducts)) {
            fetchListProducts();
        }
        if (_.isEmpty(listCategories)) {
            fetchListCategories();
        }
    }, []);
    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate("/signUp");
    };
    return (
        <>
            {/* <button onClick={()=>test()}>clcik up date product</button> */}
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
                    speed={1500}
                    spaceBetween={30}
                    slidesPerView={5}
                    // onSlideChange={() => console.log("slide change")}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // centeredSlides={true}
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
            <div className="gridBanner"></div>
            <div className="foodBanner">
                <div className="foodBannerItem">
                    <div className="foodBannerItem_text">Save 20%</div>
                    <div className="foodBannerItem_text">Today's Astackin Day </div>
                    <div className="foodBannerItem_text"> Grilled Chiken $59,00</div>
                </div>

                <div className="foodBannerItem_img"></div>
            </div>
            <div className="tableProduct">
                <div className="tableProductHeader">Popular Fast Foods</div>

                <Swiper
                    grid={{
                        rows: 2,
                    }}
                    spaceBetween={30}
                    slidesPerView={4}
                    // onSlideChange={() => console.log("slide change")}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    // navigation={true}
                    modules={[Grid, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => {
                            return (
                                <SwiperSlide>
                                    <div className="SwiperSliceBGI"></div>
                                    <div onClick={() => navigate(`/productsPage/${product._id}`)} className="topItem">
                                        <div className="SwiperSlideImg"></div>
                                        <div className="SwiperSlideDes">
                                            <div className="SwiperSlideDes_Price">{product.sellingprice.toLocaleString("vi-VN") + " đ"} </div>
                                            <div className={`${product._id} SwiperSlideDes_Name`}>{product.name} </div>
                                        </div>
                                    </div>
                                    <div className="bottomItem">
                                        {product.CountOrder === 0 ? (
                                            <div className={`addmeBtn`} onClick={() => addProductOrder(product._id)}>
                                                Add me
                                            </div>
                                        ) : (
                                            <div className="SwiperSlideDes_Btn">
                                                <CiCircleMinus onClick={() => removeProductOrder(product._id)} size={30} color="#000" style={{ margin: "20px", fontWeight: 500 }} className="btn_icon" />
                                                <div className={`${product._id} countItem`}> {product.CountOrder}</div>
                                                <CiCirclePlus onClick={() => addProductOrder(product._id)} size={30} color="#000" style={{ margin: "20px", fontWeight: 200 }} className="btn_icon" />
                                            </div>
                                        )}
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
                <div className="tableProductMore" onClick={() => navigate("/productFilterPage")}>
                    More Products
                </div>
            </div>
            <div className="comboBanner">Combo Baner</div>
            <div className="chooseUs">Choose us</div>
            <div className="thankWrapper">thank slice</div>
            <div className="productPre">
                <Swiper
                    watchSlidesProgress={true}
                    speed={1500}
                    spaceBetween={0}
                    slidesPerView={5}
                    // onSlideChange={() => console.log("slide change")}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                        clickable: false,
                    }}
                    navigation={false}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper"
                >
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => {
                            return (
                                <SwiperSlide>
                                    <div className="SwiperSlideImg">{product.presentimage ? <img src={product.presentimage} alt="" /> : <span>presentimage</span>}</div>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </>
    );
};
export default MainPage;
