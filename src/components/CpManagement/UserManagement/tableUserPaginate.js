import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './tableUserPaginate.scss'

const TableUsersPaginate = (props) => {
    const listUsers = useSelector((state) => state.listUser.users);
    const items = listUsers;

    function Items({ currentItems, itemOffset, itemsPerPage }) {
        // Tính số hàng trống cần thêm để giữ nguyên chiều cao

        return (
            <tbody className="table-users__body">
                {currentItems && currentItems.length > 0 &&
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
                                    <img
                                        src=""
                                        alt=""
                                        className="table-users__avatar"
                                    />
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
            setCurrentItems(items.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(items.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems} itemOffset={itemOffset} itemsPerPage={itemsPerPage} />
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
