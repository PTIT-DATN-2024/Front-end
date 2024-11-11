import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "./tableOrderPaginate.scss";

const TableOrdersPaginate = (props) => {
    const items = props.listOrders;

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
        timeSort: "", // "" means no sorting
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
                order.user.emailUser.toLowerCase().includes(filters.userEmail.toLowerCase())
            );
        }

        // Filter by product name (if provided)
        if (filters.product) {
            newFilteredItems = newFilteredItems.filter((order) =>
                order.listItem.some((item) => item.nameProduct.toLowerCase().includes(filters.product.toLowerCase()))
            );
        }

        // Filter by status (if provided)
        if (filters.status) {
            newFilteredItems = newFilteredItems.filter((order) => order.statusOrder === filters.status);
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
        // When the page loads or filters are changed, apply the filters
        applyFilters();
    }, [filters]);

    function Items({ currentItems, itemOffset }) {
        return (
            <div className="order-list">
                {currentItems && currentItems.length > 0 ? (
                    currentItems.map((order, index) => (
                        <div key={`order_${index}`} className="order-item">
                            <div className="order-item-index">{itemOffset + index + 1}</div>
                            <div className="order-id">{order._id}</div>
                            <div className="order-time">{order.createdAt}</div>
                            <div className="order-avatar">
                                {order.user.avatarUser && (
                                    <img src={order.user.avatarUser} alt="" className="tableOrder_avatarUser" />
                                )}
                            </div>
                            <div className="order-user">{order.user.emailUser}</div>
                            <div className="order-status">
                                <span className={`status-label status-${order.statusOrder.toLowerCase()}`}>
                                    {getStatusLabel(order.statusOrder)} {/* Display full label */}
                                </span>
                            </div>
                            <div className="order-products">
                                {order.listItem.map((item, idx) => (
                                    <div key={idx} className="product-item">
                                        <div className="product-image">
                                            {item.presentimageProduct && (
                                                <img src={item.presentimageProduct} alt="" className="tableOrder_imgProduct" />
                                            )}
                                        </div>
                                        <div className="product-name">{item.nameProduct}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="order-quantity">
                                {order.listItem.map((item, idx) => (
                                    <div key={idx} className="product-quantity">{item.quantity}</div>
                                ))}
                            </div>
                            <div className="order-sum">
                                {order.listItem.map((item, idx) => (
                                    <div key={idx} className="product-sum">{item.sum}</div>
                                ))}
                            </div>
                            <div className="order-total">{order.total}</div>
                            <div className="order-settings">
                                <button className="btn btn-secondary" onClick={() => props.handleClickBtnView(order)}>View</button>
                                <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(order)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(order)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-orders">No orders found</div>
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
                    <label htmlFor="timeSort">Sort by Time</label>
                    <select
                        id="timeSort"
                        value={filters.timeSort}
                        onChange={(e) => setFilters({ ...filters, timeSort: e.target.value })}
                    >
                        <option value="">--All--</option>
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </div>

                {/* User Email */}
                <div className="filter-item">
                    <label htmlFor="userEmail">User Email</label>
                    <input
                        type="text"
                        id="userEmail"
                        value={filters.userEmail}
                        onChange={(e) => setFilters({ ...filters, userEmail: e.target.value })}
                    />
                </div>

                {/* Product */}
                <div className="filter-item">
                    <label htmlFor="product">Product</label>
                    <input
                        type="text"
                        id="product"
                        value={filters.product}
                        onChange={(e) => setFilters({ ...filters, product: e.target.value })}
                    />
                </div>

                {/* Status */}
                <div className="filter-item">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                        <option value="">All</option>
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
                <PaginatedItems itemsPerPage={10} />
            </div>
        </div>
    );
};

export default TableOrdersPaginate;
