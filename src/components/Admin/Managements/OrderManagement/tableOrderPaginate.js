import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";

const TableOrdersPaginate = (props) => {
    const items = props.listOrders;
    console.log("new", items);
    function Items({ currentItems, itemOffset }) {
        return (
            <tbody>
                {currentItems &&
                    currentItems.length > 0 &&
                    currentItems.map((order, index) => {
                        return (
                            <tr key={`table_category_${index}`}>
                                <td>{itemOffset + index + 1}</td>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.user.avatarUser ? <img src={order.user.avatarUser} alt="" className="tableOrder_avatarUser" /> : ""}</td>
                                <td>{order.user.emailUser}</td>
                                <td>
                                    {order.listItem.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{item.presentimageProduct ? <img src={item.presentimageProduct} alt="" className="tableOrder_imgProduct" /> : ""}</td>
                                                <td key={index} scope="col">
                                                    {item.nameProduct}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </td>
                                <td>
                                    {order.listItem.map((item, index) => {
                                        return (
                                            <tr>
                                                <td key={index} scope="col">
                                                    {item.quantity}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </td>
                                <td>
                                    {order.listItem.map((item, index) => {
                                        return (
                                            <tr>
                                                <td key={index} scope="col">
                                                    {item.sum}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </td>
                                <td>{order.total}</td>
                                <td>
                                    <button className="btn btn-secondary" onClick={() => props.handleClickBtnView(order)}>
                                        View
                                    </button>
                                    <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(order)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(order)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                {currentItems && currentItems.length === 0 && (
                    <tr>
                        <td colSpan={6}>Not found order</td>
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
                <caption>Danh sách order</caption>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        {/* <th scope="col">ID</th> */}
                        <th scope="col">id</th>
                        <th scope="col">Time</th>
                        <th scope="col">avatar</th>
                        <th scope="col">USER</th>
                        
                        <th scope="col">Product</th>
                        <th scope="col">quantity</th>
                        <th scope="col">$$</th>

                        <th scope="col">total</th>
                        <th scope="col">Setting</th>
                    </tr>
                </thead>
                <PaginatedItems itemsPerPage={10} />
            </table>
        </>
    );
};

export default TableOrdersPaginate;
