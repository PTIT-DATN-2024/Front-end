import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";

const TableProductsPaginate = (props) => {
    const { listProducts, listCategories } = props;
    // console.log("table list",listProducts);
    const listProductsUpdate = listProducts.map((product) => {
        const category = listCategories.find((cat) => cat._id === product.category);
        return {
            ...product,
            category: category ? category.name: null,
        };
    });
    const items = listProductsUpdate;
    function Items({ currentItems, itemOffset }) {
        return (
            <tbody>
                {currentItems &&
                    currentItems.length > 0 &&
                    currentItems.map((product, index) => {
                        return (
                            <tr key={`table_product_${index}`}>
                                <td>{itemOffset + index + 1}</td>
                                <td>{product.presentimage ? <img src={product.presentimage} alt="" className="product-avatar"/> : ""}</td>
                                <td>{product.presentimage}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.importprice}</td>
                                <td>{product.sellingprice}</td>
                                <td>{product.weight}</td>
                                <td>{product.description}</td>
                                <td>{product.count}</td>
                                <td>
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
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">presentimage</th>
                        <th scope="col">name</th>
                        <th scope="col">category</th>
                        <th scope="col">importprice</th>
                        <th scope="col">sellingprice</th>
                        <th scope="col">weight</th>
                        <th scope="col">description</th>
                        <th scope="col">count</th>
                        <th scope="col">Setting</th>
                    </tr>
                </thead>
                <PaginatedItems itemsPerPage={10} />
            </table>
        </>
    );
};

export default TableProductsPaginate;
