import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay, Pagination, Navigation } from "swiper/modules";
import { NavLink, useNavigate } from "react-router-dom";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { BsCartPlus  } from "react-icons/bs";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./TableProductFull.scss";
import _ from "lodash";
import axios from "axios";

const TableProductFull = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [nameFilter, setNameFilter] = useState("");
    const [countFilter, setCountFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(props.categoryFilter);
    const [sortType, setSortType] = useState("");
    useEffect(() => {
        filterProducts();
    }, [nameFilter, countFilter, categoryFilter, sortType]);

    const filterProducts = () => {
        let filtered = listProducts;
        if (nameFilter) {
            filtered = filtered.filter((product) => product.name.toLowerCase().includes(nameFilter.toLowerCase()));
        }
        if (countFilter) {
            if (countFilter === "0") {
                filtered = filtered.filter((product) => product.count === 0);
            } else if (countFilter === "<50000") {
                filtered = filtered.filter((product) => product.sellingprice < 50000);
            }
        }
        if (categoryFilter) {
            filtered = filtered.filter((product) => product.category.idCategory === categoryFilter);
        }
        if (sortType === "asc") {
            filtered.sort((a, b) => a.sellingprice - b.sellingprice);
        } else if (sortType === "desc") {
            filtered.sort((a, b) => b.sellingprice - a.sellingprice);
        }
        setFilteredProducts(filtered);
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
        setFilteredProducts(listProducts);
        if (props?.categoryFilter) {
            setCategoryFilter(props.categoryFilter);
        }
    }, []);
    useEffect(() => {
        filterProducts();
    }, [listProducts]);
    return (
        <>
            <div className="tableProduct_filter">
                <div className="tableProductHeader">Popular</div>
                <div style={{ marginBottom: "20px" }} className="fillterContainer">
                    <input type="text" className="form-control itemFilter nameFillter" placeholder="Name: Gà lắc phô mai" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />

                    <select value={countFilter} onChange={(e) => setCountFilter(e.target.value)} displayEmpty style={{ marginRight: "20px" }} className="itemFilter priceFillter">
                        <option value="">Price:</option>
                        <option value="0"> free </option>
                        <option value="<50000"> nho hon50000 </option>
                    </select>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} displayEmpty style={{ marginRight: "20px" }} className="itemFilter categoryFillter">
                        <option value="">Category:</option>
                        {listCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select value={sortType} onChange={(e) => setSortType(e.target.value)} style={{ marginRight: "20px" }} className="itemFilter sortFillter">
                        <option value="">Sort:</option>
                        <option value="asc">tăng dần</option>
                        <option value="desc">giảm dần</option>
                    </select>
                </div>
                <div className="tableProduct">
                    <Swiper
                        grid={{
                            rows: 2,
                        }}
                        spaceBetween={30}
                        slidesPerView={4}
                        breakpoints={{
                            1025: {
                                slidesPerView: 6,
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
                        {filteredProducts &&
                            filteredProducts.length > 0 &&
                            filteredProducts.map((product, index) => {
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
                                                    <BsCartPlus  size={30} style={{ color: "#212121" }} />
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
                </div>
            </div>
        </>
    );
};
export default TableProductFull;
