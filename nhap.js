import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./tableProduct.scss"; // Import file SCSS cho TableProduct

const TableProductsPaginate = (props) => {
    const listProducts = useSelector((state) => state.product.listProducts);
    const account = useSelector((state) => state.user.account);
    const [filters, setFilters] = useState({
        name: '',
        total: '',
        rate: '',
        importPrice: '',
        sellingPrice: '',
        status: '',
    });

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const filteredProducts = () => {
        return listProducts.filter((product) => {
            const { name, total, rate, importPrice, sellingPrice, status } = filters;

            const matchesName = name ? product.name.toLowerCase().includes(name.toLowerCase()) : true;
            const matchesTotal =
                total === '0'
                    ? product.total === 0
                    : total === '<10'
                    ? product.total < 10
                    : total === '>=10'
                    ? product.total >= 10
                    : true;
            const matchesRate =
                rate === '1-2'
                    ? product.rate >= 1 && product.rate < 2
                    : rate === '2-3'
                    ? product.rate >= 2 && product.rate < 3
                    : rate === '3-4'
                    ? product.rate >= 3 && product.rate < 4
                    : rate === '4-5'
                    ? product.rate >= 4 && product.rate <= 5
                    : true;
            const matchesStatus =
                status === 'available'
                    ? product.status === 'available'
                    : status === 'unavailable'
                    ? product.status === 'unavailable'
                    : true;

            return matchesName && matchesTotal && matchesRate && matchesStatus;
        });
    };

    const sortedProducts = () => {
        const filtered = filteredProducts();
        const { importPrice, sellingPrice } = filters;

        if (importPrice === 'asc') {
            filtered.sort((a, b) => a.importPrice - b.importPrice);
        } else if (importPrice === 'desc') {
            filtered.sort((a, b) => b.importPrice - a.importPrice);
        }

        if (sellingPrice === 'asc') {
            filtered.sort((a, b) => a.sellingPrice - b.sellingPrice);
        } else if (sellingPrice === 'desc') {
            filtered.sort((a, b) => b.sellingPrice - a.sellingPrice);
        }

        return filtered;
    };

    const PaginatedItems = ({ itemsPerPage }) => {
        const [currentItems, setCurrentItems] = useState([]);
        const [pageCount, setPageCount] = useState(0);
        const [itemOffset, setItemOffset] = useState(0);

        const filteredAndSorted = sortedProducts();

        useEffect(() => {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(filteredAndSorted.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(filteredAndSorted.length / itemsPerPage));
        }, [itemOffset, itemsPerPage, filteredAndSorted]);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % filteredAndSorted.length;
            setItemOffset(newOffset);
        };

        return (
            <>
                <tbody>
                    {currentItems?.length > 0 ? (
                        currentItems.map((product, index) => (
                            <tr key={`table_product_${index}`} className="tableProduct_row">
                                <td className="tableProduct_rowItem">{itemOffset + index + 1}</td>
                                <td className="tableProduct_rowItem">
                                    <img
                                        src={Array.isArray(product.productImages) && product.productImages.length > 0
                                            ? product.productImages[0].image
                                            : 'http://localhost:8080/uploads/products/1721376738190.png'}
                                        alt="product"
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
                                    <button className="btn btn-secondary" onClick={() => props.handleClickBtnView(product)}>Xem</button>
                                    {account.role === "ADMIN" && (
                                        <>
                                            <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(product)}>Sửa</button>
                                            <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(product)}>Xóa</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={10}>Không tìm thấy sản phẩm</td>
                        </tr>
                    )}
                </tbody>
                {filteredAndSorted.length > 0 && (
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
        <>
            <div className="filter-section">
                <div className="filter-item">
                    <label htmlFor="productName">Tên sản phẩm</label>
                    <input
                        type="text"
                        id="productName"
                        placeholder="Tên sản phẩm"
                        value={filters.name}
                        onChange={(e) => handleFilterChange('name', e.target.value)}
                    />
                </div>
                <div className="filter-item">
                    <label htmlFor="total">Số lượng</label>
                    <select
                        id="total"
                        value={filters.total}
                        onChange={(e) => handleFilterChange('total', e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="0">0</option>
                        <option value="<10">&lt; 10</option>
                        <option value=">=10">&gt; 10</option>
                    </select>
                </div>
                <div className="filter-item">
                    <label htmlFor="rate">Đánh giá</label>
                    <select
                        id="rate"
                        value={filters.rate}
                        onChange={(e) => handleFilterChange('rate', e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="1-2">1-2</option>
                        <option value="2-3">2-3</option>
                        <option value="3-4">3-4</option>
                        <option value="4-5">4-5</option>
                    </select>
                </div>
                <div className="filter-item">
                    <label htmlFor="importPrice">Giá nhập</label>
                    <select
                        id="importPrice"
                        value={filters.importPrice}
                        onChange={(e) => handleFilterChange('importPrice', e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="asc">Tăng dần</option>
                        <option value="desc">Giảm dần</option>
                    </select>
                </div>
                <div className="filter-item">
                    <label htmlFor="sellingPrice">Giá bán</label>
                    <select
                        id="sellingPrice"
                        value={filters.sellingPrice}
                        onChange={(e) => handleFilterChange('sellingPrice', e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="asc">Tăng dần</option>
                        <option value="desc">Giảm dần</option>
                    </select>
                </div>
                <div className="filter-item">
                    <label htmlFor="status">Trạng thái</label>
                    <select
                        id="status"
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="available">Còn hàng</option>
                        <option value="unavailable">Hết hàng</option>
                    </select>
                </div>
            </div>
            <table className="table caption-top">
                {/* <caption>Danh sách sản phẩm</caption> */}
                <thead>
                    <tr className="tableProduct_row">
                        <th scope="col" className="tableProduct_rowItem">STT</th>
                        <th scope="col" className="tableProduct_rowItem">Ảnh</th>
                        <th scope="col" className="tableProduct_rowItem">Tên sản phẩm</th>
                        <th scope="col" className="tableProduct_rowItem">Danh mục</th>
                        <th scope="col" className="tableProduct_rowItem">Giá nhập</th>
                        <th scope="col" className="tableProduct_rowItem">Giá bán</th>
                        <th scope="col" className="tableProduct_rowItem">Khối lượng</th>
                        <th scope="col" className="tableProduct_rowItem">Mô tả</th>
                        <th scope="col" className="tableProduct_rowItem">Số lượng</th>
                        <th scope="col" className="tableProduct_rowItem">Cài đặt</th>
                    </tr>
                </thead>
                <PaginatedItems itemsPerPage={7} />
            </table>
        </>
    );
};

export default TableProductsPaginate;
