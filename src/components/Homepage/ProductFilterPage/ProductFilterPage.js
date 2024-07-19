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
// import "./styles.css";
// import required modules
import "./ProductFilterPage.scss";
import _ from "lodash";
import axios from "axios";
// import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from "@mui/material";

const ProductFilterPage = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [nameFilter, setNameFilter] = useState("");
    const [countFilter, setCountFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
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
        setFilteredProducts(listProducts);
    }, []);
    useEffect(() => {
        filterProducts();
    }, [listProducts]);
    return (
        <>
            {/* <button onClick={()=>test()}>clcik up date product</button> */}

            <div className="tableProduct_filter">
                <div className="tableProductHeader">Popular Fast Foods</div>
                <div style={{ marginBottom: "20px" }}>
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />

                    <select value={countFilter} onChange={(e) => setCountFilter(e.target.value)} displayEmpty style={{ marginRight: "20px" }}>
                        <option value="">Price</option>
                        <option value="0"> free </option>
                        <option value="<50000"> nho hon50000 </option>
                    </select>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} displayEmpty style={{ marginRight: "20px" }}>
                        <option value="">Category</option>
                        {listCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select value={sortType} onChange={(e) => setSortType(e.target.value)} style={{ marginRight: "20px" }}>
                        <option value="">Sort </option>
                        <option value="asc">tăng dần</option>
                        <option value="desc">giảm dần</option>
                    </select>
                </div>
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
                    {filteredProducts &&
                        filteredProducts.length > 0 &&
                        filteredProducts.map((product, index) => {
                            return (
                                <SwiperSlide>
                                    <img src={product.presentImage} alt="presentImage" className="SwiperSlideImg" />

                                    <div onClick={() => navigate(`/productsPage/${product._id}`)} className="SwiperSlideImg"></div>
                                    <div className="SwiperSlideDes">
                                        <div className="SwiperSlideDes_Price">{product.sellingprice.toLocaleString("vi-VN") + " đ"} </div>
                                        <div className={`${product._id} SwiperSlideDes_Name`}>{product.name} </div>
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
            </div>
        </>
    );
};
export default ProductFilterPage;
