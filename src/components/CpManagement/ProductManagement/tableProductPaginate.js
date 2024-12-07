import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./tableProduct.scss";
const TableProductsPaginate = (props) => {
    const listProducts = useSelector((state) => state.product.listProducts);

    const items = listProducts;
    function Items({ currentItems, itemOffset }) {
        return (
            <tbody>
                {currentItems &&
                    currentItems.length > 0 &&
                    currentItems.map((product, index) => {
                        return (
                            <tr key={`table_product_${index}`} className="tableProduct_row" >
                                <td className="tableProduct_rowItem">{itemOffset + index + 1}</td>
                                <td className="tableProduct_rowItem">
                                    <img
                                        src={Array.isArray(product.productImages) && product.productImages.length > 0
                                            ? product.productImages[0].image
                                            : 'http://localhost:8080/uploads/products/1721376738190.png'}
                                        alt=""
                                        className="productPresent"
                                    />
                                </td>
                                <td className="tableProduct_rowItem">{product.name}</td>
                                <td className="tableProduct_rowItem">{product.category.name}</td>
                                <td className="tableProduct_rowItem">{product.importPrice}</td>
                                <td className="tableProduct_rowItem">{product.sellingPrice}</td>
                                <td className="tableProduct_rowItem">{product.weight}</td>
                                <td className="tableProduct_rowItem">{product.description}</td>
                                <td className="tableProduct_rowItem">{product.total}</td>
                                <td className="tableProduct_rowItem">
                                    <button className="btn btn-secondary" onClick={() => props.handleClickBtnView(product)}>
                                        Xem
                                    </button>
                                    <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(product)}>
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(product)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                {currentItems && currentItems.length === 0 && (
                    <tr>
                        <td colSpan={6}>Không tìm thấy sản phẩm</td>
                    </tr>
                )}
            </tbody>
        );
    }

    const PaginatedItems = ({ itemsPerPage }) => {
        // We start with an empty list of items.
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(items.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(items.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
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
        <>
            <table className="table caption-top">
                <caption>Danh sách product</caption>
                <thead>
                    <tr className="tableProduct_row">
                        <th scope="col" className="tableProduct_rowItem">
                            STT
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            Ảnh
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            Tên sản phẩm
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            Danh mục
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            Giá nhập
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            Giá bán
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            Khối lượng
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            Mô tả
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            Số lượng
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            Cài đặt
                        </th>
                    </tr>
                </thead>
                <PaginatedItems itemsPerPage={10} />
            </table>
        </>
    );
};

export default TableProductsPaginate;
