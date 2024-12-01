import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "./tableOrderPaginate.scss";
import { PiCodepenLogo } from "react-icons/pi";

const TableOrdersPaginate = (props) => {
    const items = props.listOrders;
    console.log(props);
    // Status options with full labels
    const orderStatusOptions = [
        { label: "Chờ xác nhận", value: "CXN" },
        { label: "Chờ lấy hàng", value: "CLH" },
        { label: "Đang giao", value: "DG" },
        { label: "Đã hủy", value: "DH" },
        { label: "Hoàn thành", value: "HT" },
    ];

    const [filteredItems, setFilteredItems] = useState(items);
    const [filters, setFilters] = useState({
        timeSort: "asc", // "" means no sorting
        userEmail: "",
        product: "",
        status: "",
    });

    // Helper function to get the label for each status value
    const getStatusLabel = (statusCode) => {
        const status = orderStatusOptions.find((option) => option.value === statusCode);
        return status ? status.label : statusCode;
    };

    // Filter function
    const applyFilters = () => {
        let newFilteredItems = [...items];
        // Filter by user email (if provided)
        if (filters.userEmail) {
            newFilteredItems = newFilteredItems.filter((order) =>
                order.customer.email.toLowerCase().includes(filters.userEmail.toLowerCase())
            );
        }

        // Filter by product name (if provided)
        if (filters.product) {
            newFilteredItems = newFilteredItems.filter((order) =>
                order.detailOrderedProducts.some((item) => item.product.name.toLowerCase().includes(filters.product.toLowerCase()))
            );
        }

        // Filter by status (if provided)
        if (filters.status) {
            newFilteredItems = newFilteredItems.filter((order) => order.status === filters.status);
        }

        // Sort by time (if provided)
        if (filters.timeSort) {
            if (filters.timeSort === "asc") {
                newFilteredItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            } else if (filters.timeSort === "desc") {
                newFilteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
        }
        setFilteredItems(newFilteredItems);
    };

    useEffect(() => {
        if (filters.timeSort || filters.userEmail || filters.product || filters.status) {
            applyFilters(); // Áp dụng bộ lọc chỉ khi có bộ lọc được chọn
        } else {
            setFilteredItems(items); // Hiển thị tất cả đơn hàng nếu không có bộ lọc
        }
    }, [filters, items]);


    function Items({ currentItems, itemOffset }) {
        return (
            <div className="order-list">
                {currentItems && currentItems.length > 0 ? (
                    currentItems.map((order, index) => (
                        <div key={`order_${index}`} className="order-item" >
                            {/* <div className="order-item-index">{itemOffset + index + 1}</div>
                            <div className="order-id">{order._id.slice(0, 5)}</div> */}
                            <div className="order-time"> {new Date(order.createdAt).toISOString().slice(0, 10)}</div>
                            <div className="order-avatar">
                                {order.customer.avatar && (
                                    <img src="http://localhost:8080/uploads/users/banphim1.jpg" alt="" className="tableOrder_avatarUsers" />
                                )}
                                <div className="order-user">{order.customer.emailUser}</div>
                            </div>

                            <div className="order-products">
                                {order.detailOrderedProducts.map((item, idx) => (
                                    <div key={idx} className="product-item">
                                        <div className="product-image">
                                            {item.product.presentImage && (
                                                <img src="" alt="" className="tableOrder_imgProduct" />
                                            )}
                                        </div>
                                        <div className="product-name">{item.product.name}</div>
                                        {/* <div key={idx} className="product-sellingprice">{item.sellingpriceProduct}</div> */}
                                        <div key={idx} className="product-quantity">{item.quantity}</div>
                                        <div key={idx} className="product-sum">{item.totalPrice}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="order-total">{order.total}</div>
                            <div className="order-status">
                                <span className={`status-label status-${order.status.toLowerCase()}`}>
                                    {getStatusLabel(order.status)}
                                </span>
                            </div>
                            <div className="order-settings-staff">
                                <button className="btn btn-secondary" onClick={() => props.handleClickBtnView(order)}>Xem</button>
                                <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(order)}>Sửa</button>
                                <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(order)}>Xóa</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-orders">Không tìm thấy đơn hàng nào</div>
                )}
            </div>
        );
    }

    const PaginatedItems = ({ itemsPerPage }) => {
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(filteredItems.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
        }, [itemOffset, itemsPerPage, filteredItems]);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems} itemOffset={itemOffset} />
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
            </>
        );
    };

    return (
        <div className="table-orders-container">
            <h2 className="table-caption">Danh sách order</h2>

            {/* Filter Section */}
            <div className="filter-section">
                {/* Time Sort */}
                <div className="filter-item">
                    <label htmlFor="timeSort">Xếp theo thời gian</label>
                    <select
                        id="timeSort"
                        value={filters.timeSort}
                        onChange={(e) => setFilters({ ...filters, timeSort: e.target.value })}
                    >
                        <option value="">Tất cả</option>
                        <option value="desc">Mới nhất</option>
                        <option value="asc">Cũ nhất</option>
                    </select>
                </div>

                {/* User Email */}
                <div className="filter-item">
                    <label htmlFor="userEmail">Email khách hàng</label>
                    <input
                        type="text"
                        id="userEmail"
                        value={filters.userEmail}
                        onChange={(e) => setFilters({ ...filters, userEmail: e.target.value })}
                    />
                </div>

                {/* Product */}
                <div className="filter-item">
                    <label htmlFor="product">Sản phẩm</label>
                    <input
                        type="text"
                        id="product"
                        value={filters.product}
                        onChange={(e) => setFilters({ ...filters, product: e.target.value })}
                    />
                </div>

                {/* Status */}
                <div className="filter-item">
                    <label htmlFor="status">Trạng thái</label>
                    <select
                        id="status"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                        <option value="">Tất cả</option>
                        {orderStatusOptions.map((status, index) => (
                            <option key={index} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Order Table */}
            <div className="order-table">
                < div className="header-table">
                    {/* <div className="item header-stt">STT</div>
                        <div className="item header-code">CODE</div> */}
                    <div className="item header-date">THỜI GIAN</div>
                    <div className="item header-user">KHÁCH HÀNG</div>
                    <div className="item header-nameProduct">TÊN SẢN PHẨM</div>
                    {/* <div className="item header-price">ĐƠN GIÁ</div> */}
                    <div className="item header-quantity">SL</div>
                    <div className="item header-sum">TỔNG</div>
                    <div className="item header-total">THANH TOÁN</div>
                    <div className="item header-statusOrder">TRẠNG THÁI</div>
                    <div className="item header-setting">CÀI ĐẶT</div>
                </div>
                <PaginatedItems itemsPerPage={10} />
            </div>
        </div>
    );
};

export default TableOrdersPaginate;
