import React, { useEffect, useState } from "react";
import { putEditStatusOrder, getOrdersByUserId } from "../../../../../services/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./MyOrder.scss";

const MyOrder = () => {
    const navigate = useNavigate();
    const account = useSelector((state) => state.user.account);

    const [orders, setOrders] = useState([]); // Khởi tạo mặc định là mảng rỗng
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("all");

    // Các tùy chọn trạng thái đơn hàng
    const orderStatusOptions = [
        { label: "Tất cả", value: "all" },
        { label: "Chờ xác nhận", value: "CXN" },
        { label: "Chờ lấy hàng", value: "CLH" },
        { label: "Đang giao", value: "DG" },
        { label: "Đã hủy", value: "DH" },
        { label: "Hoàn thành", value: "HT" },
    ];

    // Hàm lấy danh sách đơn hàng từ API
    const fetchOrderUser = async () => {
        try {
            let res_data = await getOrdersByUserId(account.id);
            if (res_data && res_data.EC === 0) {
                setOrders(res_data.orders || []); // Đảm bảo orders luôn là mảng
                toast.success(res_data.MS);
            } else {
                setOrders([]); // Nếu API lỗi, đặt orders thành mảng rỗng
                toast.error(res_data?.MS || "Không thể lấy danh sách đơn hàng.");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Đã xảy ra lỗi khi lấy danh sách đơn hàng.");
            setOrders([]);
        }
    };

    // Lọc đơn hàng theo trạng thái
    useEffect(() => {
        if (selectedStatus === "all") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(
                orders.filter((order) => order.status === selectedStatus)
            );
        }
    }, [selectedStatus, orders]);

    // Lấy danh sách đơn hàng khi component được mount
    useEffect(() => {
        fetchOrderUser();
    }, []);

    return (
        <div className="box-order-list-tk-new">
            {/* Tabs chọn trạng thái đơn hàng */}
            <div className="list-tab-tk">
                {orderStatusOptions.map((option) => (
                    <div
                        key={option.value}
                        className={selectedStatus === option.value ? "active item" : "item"}
                        onClick={() => setSelectedStatus(option.value)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>

            {/* Nội dung danh sách đơn hàng */}
            <div className="content-tab-tk">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <div key={order.orderId} className="order_item">
                            <div className="order_code">Mã đơn: {order.orderId}</div>
                            <div className="order_item_pdList">
                                {Array.isArray(order.detailOrderedProducts) ? (
                                    order.detailOrderedProducts.map((item) => (
                                        <div key={item.detailOrderProductId} className="order_item_pdItem">
                                            <div className="pd-info-left">
                                                <img
                                                    src={item.product.productImages[0].image || "/default-image.png"}
                                                    alt={item.product.name || "Sản phẩm"}
                                                />
                                            </div>
                                            <div className="pd-info-right">
                                                <h1 className="name">{item.product.name || "Tên sản phẩm"}</h1>
                                                <div className="pd-status-group">
                                                    <p>Mã SP: <b className="blue">{item.product.productId.slice(0,6) || "N/A"}</b></p>
                                                </div>
                                                <p className="pd-price">
                                                    Giá: {item.product.sellingPrice?.toLocaleString("vi-VN") || 0}
                                                    <u>đ</u>
                                                </p>
                                                <p className="pd-quantity">
                                                    Số lượng: {item.quantity || 0}
                                                </p>
                                            </div>
                                            <p className="pd-total">
                                                {item.totalPrice?.toLocaleString("vi-VN") || 0}
                                                <u>đ</u>
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div>Không có sản phẩm nào trong đơn hàng này.</div>
                                )}
                            </div>
                            <div className="order_bottom">
                                <div className="order_total">
                                    Tổng số tiền: <span>{order.total?.toLocaleString("vi-VN") || 0}đ</span>
                                </div>
                                <div className="btn_submit" onClick={() => navigate("/")}>
                                    Mua lại
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="tk-ct-null">
                        <img
                            src="https://png.pngtree.com/element_our/png/20181031/shopping-cart-png_224349.jpg"
                            alt="shopping"
                            className="loading"
                        />
                        <div className="tk-null-note">Bạn chưa có đơn hàng nào</div>
                        <div
                            className="tk-buy-ot tk-btn-submit"
                            onClick={() => navigate("/")}
                        >
                            Tiếp tục mua sắm
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrder;
