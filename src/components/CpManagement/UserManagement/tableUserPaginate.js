import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Select, Button, Row, Col } from "antd";
import "./tableUserPaginate.scss";

const { Option } = Select;

const TableUsersPaginate = (props) => {
    const listUsers = useSelector((state) => state.listUser.users);
    const account = useSelector((state) => state.user.account);

    const [items, setItems] = useState(listUsers); // Original data
    const [filteredItems, setFilteredItems] = useState(listUsers); // Filtered data
    const [filters, setFilters] = useState({
        email: "",
        address: "",
        phone: "",
        role: "",
        sort: null,
    });

    useEffect(() => {
        // Update items whenever listUsers changes
        setItems(listUsers);
        setFilteredItems(listUsers);
    }, [listUsers]);

    useEffect(() => {
        handleFilter();
    }, [filters]);

    const handleFilter = () => {
        let data = [...items];

        // Apply filters
        if (filters.email) {
            data = data.filter((user) =>
                user.email.toLowerCase().includes(filters.email.toLowerCase())
            );
        }
        if (filters.address) {
            data = data.filter((user) =>
                user.address.toLowerCase().includes(filters.address.toLowerCase())
            );
        }
        if (filters.phone) {
            data = data.filter((user) =>
                user.phone.toLowerCase().includes(filters.phone.toLowerCase())
            );
        }
        if (filters.role) {
            data = data.filter((user) =>
                user.role.toLowerCase().includes(filters.role.toLowerCase())
            );
        }

        // Apply sorting
        if (filters.sort === "asc") {
            data.sort(
                (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
        } else if (filters.sort === "desc") {
            data.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }

        setFilteredItems(data);
    };

    const handleChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetFilters = () => {
        setFilters({
            email: "",
            address: "",
            phone: "",
            role: "",
            sort: null,
        });
    };

    function Items({ currentItems, itemOffset }) {
        return (
            <tbody className="table-users__body">
                {currentItems &&
                    currentItems.length > 0 &&
                    currentItems.map((user, index) => (
                        <tr key={`table_user_${index}`} className="table-users__row">
                            <td className="table-users__cell table-users__cell--index">
                                {itemOffset + index + 1}
                            </td>
                            <td className="table-users__cell table-users__cell--avatar">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="User Avatar"
                                        className="table-users__avatar"
                                    />
                                ) : (
                                    <img src="" alt="" className="table-users__avatar" />
                                )}
                            </td>
                            <td className="table-users__cell table-users__cell--email">
                                {user.email}
                            </td>
                            <td className="table-users__cell table-users__cell--address">
                                {user.address}
                            </td>
                            <td className="table-users__cell table-users__cell--phone">
                                {user.phone}
                            </td>
                            <td className="table-users__cell table-users__cell--role">
                                {user.role}
                            </td>
                            <td className="table-users__cell table-users__cell--actions">
                                <button
                                    className="btn btn-secondary table-users__btn"
                                    onClick={() => props.handleClickBtnView(user)}
                                >
                                    Xem
                                </button>
                                {account.role === "ADMIN" && (
                                    <>
                                        <button
                                            className="btn btn-warning mx-3 table-users__btn"
                                            onClick={() => props.handleClickBtnUpdate(user)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="btn btn-danger table-users__btn"
                                            onClick={() => props.handleClickBtnDelete(user)}
                                        >
                                            Xóa
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
            </tbody>
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
                    pageClassName="pagination__item"
                    pageLinkClassName="pagination__link"
                    previousClassName="pagination__item pagination__item--previous"
                    previousLinkClassName="pagination__link"
                    nextClassName="pagination__item pagination__item--next"
                    nextLinkClassName="pagination__link"
                    breakLabel="..."
                    breakClassName="pagination__item pagination__item--break"
                    breakLinkClassName="pagination__link"
                    containerClassName="pagination"
                    activeClassName="pagination__item--active"
                    renderOnZeroPageCount={null}
                />
            </>
        );
    };

    return (
        <div className="table-users">
            <div className="filter-section">
                <div className="filter-item">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Tìm theo email"
                        value={filters.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </div>
                <div className="filter-item">
                    <label htmlFor="address">Địa chỉ</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Tìm theo địa chỉ"
                        value={filters.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                    />
                </div>
                <div className="filter-item">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                        type="text"
                        id="phone"
                        placeholder="Tìm theo số điện thoại"
                        value={filters.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />
                </div>
                <div className="filter-item">
                    <label htmlFor="role">Vai trò</label>
                    <select
                        id="role"
                        value={filters.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="admin">Admin</option>
                        <option value="user">Người dùng</option>
                    </select>
                </div>
                <div className="filter-item">
                    <label htmlFor="sort">Sắp xếp</label>
                    <select
                        id="sort"
                        value={filters.sort}
                        onChange={(e) => handleChange("sort", e.target.value)}
                    >
                        <option value="">Mặc định</option>
                        <option value="asc">Ngày tạo tăng dần</option>
                        <option value="desc">Ngày tạo giảm dần</option>
                    </select>
                </div>
            </div>

            <table className="table-users__table">
                <thead className="table-users__header">
                    <tr className="table-users__row">
                        <th className="table-users__cell table-users__cell--header">STT</th>
                        <th className="table-users__cell table-users__cell--header">Avatar</th>
                        <th className="table-users__cell table-users__cell--header">Email</th>
                        <th className="table-users__cell table-users__cell--header">Địa chỉ</th>
                        <th className="table-users__cell table-users__cell--header">Số điện thoại</th>
                        <th className="table-users__cell table-users__cell--header">Vai trò</th>
                        <th className="table-users__cell table-users__cell--header">Cài đặt</th>
                    </tr>
                </thead>
                <PaginatedItems itemsPerPage={7} />
            </table>
        </div>
    );
};

export default TableUsersPaginate;
