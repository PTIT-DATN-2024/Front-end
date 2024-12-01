import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "./tableBgImage.scss"
const TableBgImagesPaginate = (props) => {
    const { listBgImages } = props;
    const items = listBgImages;
    function Items({ currentItems, itemOffset }) {
        return (
            <tbody>
                {currentItems &&
                    currentItems.length > 0 &&
                    currentItems.map((bgImage, index) => {
                        return (
                            <tr key={`table_bgImage_${index}`} className="tableBgImage_row">
                                <td>{itemOffset + index + 1}</td>
                                <td className="tableBgImage_rowItem">{<img src={bgImage.img} alt="" className="bgImagePresent" />}</td>
                                <td>{bgImage.name}</td>
                                <td>
                                    <button className="btn btn-secondary" onClick={() => props.handleClickBtnView(bgImage)}>
                                        Xem
                                    </button>
                                    <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(bgImage)}>
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(bgImage)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                {currentItems && currentItems.length === 0 && (
                    <tr>
                        <td colSpan={6}>Not found bgImage</td>
                    </tr>
                )}
            </tbody>
        );
    }

    const PaginatedItems = ({ itemsPerPage }) => {
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
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
                <caption>Danh sách bgImage</caption>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">IMG</th>
                        <th scope="col">Name</th>
                        <th scope="col">Setting</th>
                    </tr>
                </thead>
                <PaginatedItems itemsPerPage={10} />
            </table>
        </>
    );
};

export default TableBgImagesPaginate;
