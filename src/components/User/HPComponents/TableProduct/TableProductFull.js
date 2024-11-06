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
import ReactPaginate from "react-paginate";

const TableProductFull = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [countFilter, setCountFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(props.categoryFilter);
    const [sortType, setSortType] = useState("");
    useEffect(() => {
        filterProducts();
    }, [countFilter, categoryFilter, sortType]);
    const addProductOrder = (productId) => {
        dispatch({ type: "add_product", payload: productId });
        toast.success("Product added to order.");
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
                <ReactPaginate
                    nextLabel=" >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< "
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item-previous"
                    previousLinkClassName="page-link"
                    nextClassName="page-item-next"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </>
        );
    };
    const Items = ({ currentItems, itemOffset }) => (
        <div className="listPd">
            {currentItems && currentItems.length > 0 ? (
                currentItems.map((product, index) => (
                    <div key={index} onClick={() => navigate(`/productsPage/${product._id}`)} className="productSlide">
                        <div className="p-img">
                            <img src={product.presentImage} alt={product.name} />
                        </div>
                        <div className="p-rate">
                            <span className="p-count-rate">{product.rate}</span>
                            <span className="p-count-rate">({product.numberVote})</span>
                            <p className="p-sku">Mã: {product.sku}</p>
                        </div>
                        <div className="p-info">
                            <p className="p-name">{product.name}</p>
                            <span className="p-discount"> (Tiết kiệm: 19% )</span>
                            <span className="p-price">{product.sellingprice.toLocaleString("vi-VN") + " đ"}</span>
                        </div>
                        <div className="p-action">
                            <span className="p-qty">Sẵn hàng</span>
                            <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductOrder(product._id)} />
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

                <PaginatedItems itemsPerPage={7} />
            </div>
        </div>
    );
};
export default TableProductFull;
