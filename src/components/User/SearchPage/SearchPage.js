import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getSearchProduct } from "../../../services/apiServices";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { BsCartPlus } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./SearchPage.scss";
import { postProductToCart , getCartbyUserid} from "../../../services/apiServices";
import { useSelector } from "react-redux";

const SearchPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const userState = useSelector((state) => state.user.account);
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);
    const query = new URLSearchParams(location.search).get("query");
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [countFilter, setCountFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortType, setSortType] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await getSearchProduct(query);
                if (response.EC === 0) {
                    setResults(response.products);
                    setFilteredProducts(response.products);
                    console.log(results);
                    setErrorMessage("");
                } else {

                    setErrorMessage("0 results found");
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
                setErrorMessage("An error occurred while fetching results.");
            }
        };

        if (query) fetchSearchResults();
    }, [query]);
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
                toast.success("Thêm sản phẩm thành công");
                fetchCart();
            }
            if (res_data && res_data.EC !== 0) {
                toast.error("Thêm sản phẩm thất bại");
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
            const newOffset = (event.selected * itemsPerPage) % results.length;
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
                    <div key={index} onClick={() => navigate(`/productsPage/${product.productId}`)} className="productSlide">
                        <div className="p-img">
                            <img src={product?.productImages?.[0]?.image} alt={product.name} />
                        </div>
                        <div className="p-rate">
                            <span className="p-count-rate">{product.rate}</span>
                            <span className="p-count-rate">({product.numberVote})</span>
                            <p className="p-sku">Mã: {product.productId.slice(0,6)}</p>
                        </div>
                        <div className="p-info">
                            <p className="p-name">{product.name}</p>
                            <span className="p-discount"> (Tiết kiệm: 10% )</span>
                            <span className="p-price">{product.sellingPrice.toLocaleString("vi-VN") + " đ"}</span>
                        </div>
                        <div className="p-action">
                            <span className="p-qty">Sẵn hàng</span>
                            <BsCartPlus size={30} style={{ color: "#212121" }} className="addmeBtn" onClick={() => addProductOrder(product.productId)} />
                        </div>
                    </div>
                ))
            ) : (
                <div>Không có sản phẩm nào</div>
            )}
        </div>
    );
    const filterProducts = () => {
        let filtered = results;
        if (countFilter) {
            if (countFilter === "0") {
                filtered = filtered.filter((product) => product.count === 0);
            } else if (countFilter === "<50000") {
                filtered = filtered.filter((product) => product.sellingPrice < 50000);
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
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="tableProduct">
                <div style={{ marginBottom: "20px" }} className="fillterContainer">
                    <select value={countFilter} onChange={(e) => setCountFilter(e.target.value)} displayEmpty style={{ marginRight: "20px" }} className="itemFilter priceFillter">
                        <option value="">Giá:</option>
                        <option value="0"> 10000 </option>
                        <option value="<50000"> 50000 </option>
                    </select>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} displayEmpty style={{ marginRight: "20px" }} className="itemFilter categoryFillter">
                        <option value="">Danh mục:</option>
                        {listCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select value={sortType} onChange={(e) => setSortType(e.target.value)} style={{ marginRight: "20px" }} className="itemFilter sortFillter">
                        <option value="">Sắp xếp:</option>
                        <option value="asc">tăng dần</option>
                        <option value="desc">giảm dần</option>
                    </select>
                </div>

                <PaginatedItems itemsPerPage={7} />
            </div>
        </div>
    );
};

export default SearchPage;
