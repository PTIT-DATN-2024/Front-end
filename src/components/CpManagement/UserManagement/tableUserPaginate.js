import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const TableUsersPaginate = (props) => {
    const listUsers = useSelector((state) => state.listUser.users);
    const items = listUsers;
    function Items({ currentItems, itemOffset }) {
        return (
            <tbody>
                {currentItems &&
                    currentItems.length > 0 &&
                    currentItems.map((user, index) => {
                        return (
                            <tr key={`table_user_${index}`} onClick={() => props.handleClickBtnView(user)}>
                                <td>{itemOffset + index + 1}</td>
                                <td>{user.avatar ? <img src={user.avatar} alt="" className="user-avatar"/> : ""}</td>
                                {/* <td>{user._id}</td> */}
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-secondary" onClick={() => props.handleClickBtnView(user)}>
                                        View
                                    </button>
                                    <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(user)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(user)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                {currentItems && currentItems.length === 0 && (
                    <tr>
                        <td colSpan={6}>Not found user</td>
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
                <caption>Danh sách User</caption>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        {/* <th scope="col">ID</th> */}
                        <th scope="col"></th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Role</th>
                        <th scope="col">Setting</th>
                    </tr>
                </thead>
                <PaginatedItems itemsPerPage={10} />
            </table>
        </>
    );
};

export default TableUsersPaginate;
