import React, { useEffect, useState } from "react";
import { putEditStatusOrder, getOrdersByUserId } from "../../../../../services/apiServices";
import { Outlet } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import { FaArrowUp } from "react-icons/fa";
import "./MyOrder.scss"
import { useNavigate } from "react-router-dom";


const MyOrder = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const accountId = useSelector((state) => state.user.account._id);



    const EditStatusOrder = async (idOrder, statusOrder) => {
        let res_data = await putEditStatusOrder(idOrder, statusOrder);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            // navigate("/");
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };
    const fetchOrderUser = async (accountId) => {
        let res_data = await getOrdersByUserId(accountId);
        if (res_data && res_data.EC === 0) {
            setOrders(res_data.orders);
            toast.success(res_data.MS);
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };

    const orderStatusOptions = [
        { label: "Tất cả", value: "all" },
        { label: "Chờ xác nhận", value: "CXN" },
        { label: "Chờ lấy hàng", value: "CLH" },
        { label: "Đang giao", value: "DG" },
        { label: "Đã hủy", value: "DH" },
        { label: "Hoàn thành", value: "HT" },
    ];
    // 'CXN': 'Chờ xác nhận',
    // 'CLH': 'Chờ lấy hàng',
    // 'DG': 'Đang giao',
    // 'DH': 'Đã hủy',
    // 'HT': 'Hoàn thành',
    // Lấy danh sách đơn hàng từ hàm fetchOrderUser
    useEffect(() => {
        fetchOrderUser()
        setFilteredOrders(orders);

    }, []);

    // Lọc đơn hàng theo trạng thái đã chọn
    useEffect(() => {
        if (selectedStatus === "all") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order => order.statusOrder === selectedStatus));
        }
    }, [selectedStatus, orders]);

    const handleSearch = () => {
        // Xử lý tìm kiếm đơn hàng (tùy vào yêu cầu của bạn)
        console.log("Searching orders...");
    };

    return (
        <div className="box-order-list-tk-new">
            <div className="list-tab-tk">
                {orderStatusOptions.map(option => (
                    <div
                        key={option.value}
                        href="#"
                        className={selectedStatus === option.value ? "active item" : "item"}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedStatus(option.value);
                        }}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
            {/* <div className="box-search-tk">
                <button onClick={handleSearch}><i className="fa fa-search" aria-hidden="true"></i></button>
                <input id="input-search-order-tk" type="text" placeholder="Tìm kiếm theo tên sản phẩm" />
            </div> */}
            <div className="content-tab-tk">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <div key={order._id} className="order_item">
                            <div className="order_code">{order._id}</div>
                            <div className="order_item_pdList">
                                {order.listItem.map(item => (
                                    <div key={item.idProduct} className="order_item_pdItem">
                                        <div className="pd-info-left">
                                            <img src={item.presentImageProduct} alt={`Laptop Asus VivoBook X1404ZA-NK386W (i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)`} />
                                        </div>
                                        <div className="pd-info-right">
                                            <h1 className="name">{item.nameProduct}</h1>
                                            <div className="pd-status-group">
                                                <p>Mã SP: <b className="blue">LTAU811</b></p>
                                            </div>

                                            <p className="pd-price" >
                                                {item.sellingpriceProduct.toLocaleString("vi-VN")}
                                                <u>đ</u>
                                            </p>
                                            <p className="pd-quantity" >
                                                {item.quantity}
                                                <u>đ</u>
                                            </p>

                                        </div>
                                        <p className="pd-total" >
                                            {item.sum}
                                            <u>đ</u>
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="order_total">{order.total}</p>
                        </div>
                    ))
                ) : (
                    <div className="tk-ct-null">
                        <img src="/template/2024/images/tk-shopping-img.png" alt="shopping" className="loading" data-was-processed="true" />
                        <div className="tk-null-note">Bạn chưa có đơn hàng nào</div>
                        <div href="/" className="tk-buy-ot tk-btn-submit" onClick={() => {
                            navigate("/");
                        }}>Tiếp tục mua sắm</div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default MyOrder;
