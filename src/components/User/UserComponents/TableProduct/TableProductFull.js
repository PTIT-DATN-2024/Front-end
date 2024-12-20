import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay, Pagination, Navigation } from "swiper/modules";
import { NavLink, useNavigate } from "react-router-dom";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { BsCartPlus } from "react-icons/bs";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./TableProductFull.scss";
import _ from "lodash";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { postProductToCart , getCartbyUserid} from "../../../../services/apiServices";

const TableProductFull = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [countFilter, setCountFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(props.categoryFilter);
    const userState = useSelector((state) => state.user.account);
    const [sortType, setSortType] = useState("");
    useEffect(() => {
        filterProducts();
    }, [countFilter, categoryFilter, sortType]);
    const fetchCart = async () => {
        let res = await getCartbyUserid(userState.id);
        if (res.EC === 0) {
            dispatch({
                type: "FETCH_CART_SUCCESS",
                payload: res,
            });
        }
    };
    const addProductOrder = async (product) => {
        if (userState.role === "CUSTOMER") {
            let data = {
                customerId: userState.id,
                product: product,
                quantity: 1,
                totalPrice: product.sellingPrice
            };
            let res_data = await postProductToCart(data);
            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
                fetchCart();
            }
            if (res_data && res_data.EC !== 0) {
                toast.error(res_data.MS);
            }
        }
    };
    const PaginatedItems = ({ itemsPerPage }) => {
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
        }, [itemOffset, itemsPerPage, filteredProducts]);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % listProducts.length;
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems} itemOffset={itemOffset} />
                {filteredProducts.length > 0 && (
                    <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                )}
            </>
        );
    };
    const Items = ({ currentItems, itemOffset }) => (
        <div className="listPd">
            {currentItems && currentItems.length > 0 ? (
                currentItems.map((product, index) => (
                    <div key={index} onClick={() => navigate(`/productsPage/${product.productId}`)} className="productSlide">
                        <div className="p-img">
                            <img src={product.productImages[0].image} alt={product.name} />
                        </div>
                        <div className="p-rate">
                            <span className="p-count-rate">{product.rate} ({product.numberVote})</span>
                            <p className="p-sku">Mã: {product.productId.substring(0, 6)}</p>
                        </div>
                        <div className="p-info">
                            <p className="p-name">{product.name}</p>
                            {
                                product?.productDiscount?.discountAmount != null
                                    ? <span class="p-discount">Tiết kiệm: {product?.productDiscount?.discountAmount}</span>
                                    : <span class="p-discount">Mới ! </span>
                            }
                            <span class="p-price"> {product.sellingPrice.toLocaleString("vi-VN") + " đ"}</span> 
                        </div>
                        <div className="p-action">
                            <span className="p-qty">{(product.status === "available" || product.status === "") ? "Sắn hàng" : "Đặt trước"}</span>
                            <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductOrder(product)} />
                        </div>
                    </div>
                ))
            ) : (
                <div>Không có sản phẩm nào</div>
            )}
        </div>
    );
    const filterProducts = () => {
        let filtered = listProducts;
        if (countFilter) {
            if (countFilter === "0") {
                filtered = filtered.filter((product) => product.sellingPrice === 0);
            } else if (countFilter === "<5") {
                filtered = filtered.filter((product) => product.sellingPrice < 5);
            }
        }
        if (categoryFilter) {
            filtered = filtered.filter((product) => product.category.categoryId === categoryFilter);
        }
        if (sortType === "asc") {
            filtered.sort((a, b) => a.sellingPrice - b.sellingPrice);
        } else if (sortType === "desc") {
            filtered.sort((a, b) => b.sellingPrice - a.sellingPrice);
        }
        setFilteredProducts(filtered);
    };
    return (
        <div className="search-page-container">
            <div className="tableProduct">
                <div style={{ marginBottom: "20px" }} className="fillterContainer">
                    <select value={countFilter} onChange={(e) => setCountFilter(e.target.value)} displayEmpty style={{ marginRight: "20px" }} className="itemFilter priceFillter">
                        <option value="">Price:</option>
                        <option value="0"> free </option>
                        <option value="<50000"> nho hon50000 </option>
                    </select>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} displayEmpty style={{ marginRight: "20px" }} className="itemFilter categoryFillter">
                        <option value="">Category:</option>
                        {listCategories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
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

                <PaginatedItems itemsPerPage={8} />
            </div>
        </div>
    );
};
export default TableProductFull;
