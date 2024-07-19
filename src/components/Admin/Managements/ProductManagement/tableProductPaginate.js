import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./tableProduct.scss";
// import sample from "../../../../assets/image/04.jpg";
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
                            <tr key={`table_product_${index}`} className="tableProduct_row">
                                <td className="tableProduct_rowItem">{itemOffset + index + 1}</td>
                                <td className="tableProduct_rowItem">{<img src={product.presentImage} alt="" className="productPresent" />}</td>
                                <td className="tableProduct_rowItem">{product.name}</td>
                                <td className="tableProduct_rowItem">{product.category.nameCategory}</td>
                                <td className="tableProduct_rowItem">{product.importprice}</td>
                                <td className="tableProduct_rowItem">{product.sellingprice}</td>
                                <td className="tableProduct_rowItem">{product.weight}</td>
                                <td className="tableProduct_rowItem">{product.description}</td>
                                <td className="tableProduct_rowItem">{product.count}</td>
                                <td className="tableProduct_rowItem">
                                    <button className="btn btn-secondary" onClick={() => props.handleClickBtnView(product)}>
                                        View
                                    </button>
                                    <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(product)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(product)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                {currentItems && currentItems.length === 0 && (
                    <tr>
                        <td colSpan={6}>Not found product</td>
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
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
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
                            presentImage
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            name
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            category
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            importprice
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            sellingprice
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            weight
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            description
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            count
                        </th>
                        <th scope="col" className="tableProduct_rowItem">
                            Setting
                        </th>
                    </tr>
                </thead>
                <PaginatedItems itemsPerPage={10} />
            </table>
        </>
    );
};

export default TableProductsPaginate;
