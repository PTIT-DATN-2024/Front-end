import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay, Pagination, Navigation } from "swiper/modules";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./TableProductPre.scss";
// import required modules

import _ from "lodash";

const TableProductPre = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);

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
    return (
        <>
            <div className="tableProduct">
                <Swiper
                    grid={{
                        rows: 2,
                    }}
                    spaceBetween={30}
                    slidesPerView={4}
                    breakpoints={{
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                        780: {
                            slidesPerView: 4,
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
                    modules={[Grid]}
                    className="mySwiper"
                >
                    {listProducts &&
                        listProducts.length > 0 &&
                        listProducts.map((product, index) => {
                            return (
                                <SwiperSlide>
                                    <div onClick={() => navigate(`/productsPage/${product._id}`)} className="topItem">
                                        <div className="SwiperSlideImg">
                                            <div className="content">
                                                <img src={product.presentImage} alt="presentImage" className="SwiperSlideImgItem" />
                                            </div>
                                        </div>
                                        <div className="SwiperSlideDes">
                                            <div className={`${product._id} SwiperSlideDes_Name`}>{product.name} </div>
                                            <div className="SwiperSlideDes_Price">{product.sellingprice.toLocaleString("vi-VN") + " đ"} </div>
                                        </div>
                                    </div>
                                    <div className="bottomItem">
                                        {product.CountOrder === 0 ? (
                                            <div className={`addmeBtn`} onClick={() => addProductOrder(product._id)}>
                                                <BsCartPlus  size={30}   style={{ color: '#212121' }}/>
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
        </>
    );
};
export default TableProductPre;
