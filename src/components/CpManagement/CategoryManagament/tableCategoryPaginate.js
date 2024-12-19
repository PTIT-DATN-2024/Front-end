import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "./tableCategory.scss";
import { useSelector } from "react-redux";

const TableCategoriesPaginate = (props) => {
    const listCategories = useSelector((state) => state.category.listCategories);
    const items = listCategories || [];
    const account = useSelector((state) => state.user.account);
    function Items({ currentItems, itemOffset }) {
        return (
            <tbody>
                {currentItems?.length > 0 ? (
                    currentItems.map((category, index) => (
                        <tr key={`table_category_${index}`} className="tableCategory_row">
                            <td className="tableCategory_rowItem">{itemOffset + index + 1}</td>
                            <td className="tableCategory_rowItem">
                                {category.avatar ? (
                                    <img src={category.avatar} alt="category" className="categoryPresent" />
                                ) : (
                                    "Không có ảnh"
                                )}
                            </td>
                            <td className="tableCategory_rowItem">{category.name}</td>
                            <td className="tableCategory_rowItem">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => props.handleClickBtnView(category)}
                                >
                                    Xem
                                </button>
                                {account.role === "ADMIN" && (
                                    <button
                                        className="btn btn-warning mx-3"
                                        onClick={() => props.handleClickBtnUpdate(category)}
                                    >
                                        Sửa
                                    </button>
                                )}
                                {account.role === "ADMIN" && (
                                    <button
                                    className="btn btn-danger"
                                    onClick={() => props.handleClickBtnDelete(category)}
                                >
                                    Xóa
                                </button>
                                )}

                                
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4}>Không tìm thấy danh mục sản phẩm</td>
                    </tr>
                )}
            </tbody>
        );
    }

    const PaginatedItems = ({ itemsPerPage }) => {
        const [currentItems, setCurrentItems] = useState([]);
        const [pageCount, setPageCount] = useState(0);
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(items.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(items.length / itemsPerPage));
        }, [itemOffset, itemsPerPage, items]);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems} itemOffset={itemOffset} />
                {items.length > 0 && (
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

    return (
        <table className="table caption-top">
            <caption>Danh sách danh mục</caption>
            <thead>
                <tr className="tableCategory_row">
                    <th scope="col" className="tableCategory_rowItem">STT</th>
                    <th scope="col" className="tableCategory_rowItem">Ảnh</th>
                    <th scope="col" className="tableCategory_rowItem">Tên danh mục</th>
                    <th scope="col" className="tableCategory_rowItem">Cài đặt</th>
                </tr>
            </thead>
            <PaginatedItems itemsPerPage={8} />
        </table>
    );
};

export default TableCategoriesPaginate;
