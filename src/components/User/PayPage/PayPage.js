import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import "./PayPage.scss";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postCreateUserOrder, postCreatePayment } from "../../../services/apiServices";
import { getAllProducts, removeProductToCart, getCartbyUserid, changeQuantityOfProductToCart } from "../../../services/apiServices";
import { FaRegSave } from "react-icons/fa";
const PayPage = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user.account);
    const account = useSelector((state) => state.user.account);
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const stateOrder = useSelector((state) => state.listOrder);
    const listCategories = useSelector((state) => state.category.listCategories);
    const userCart = useSelector((state) => state.cart.cartItems);
    const [quantities, setQuantities] = useState({});
    const [paymentUrl, setPaymentUrl] = useState("");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        const initialQuantities = {};
        userCart.forEach((item) => {
            initialQuantities[item.cartDetailId] = item.quantity; // Khởi tạo từ Redux
        });
        setQuantities(initialQuantities); // Cập nhật state
    }, [userCart]);
    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_product",
                payload: res.products.filter(product => product.isDelete === "False"),
            });
        }
    };
    const fetchCart = async () => {
        let res = await getCartbyUserid(userState.id);
        if (res.EC === 0) {
            dispatch({
                type: "FETCH_CART_SUCCESS",
                payload: res,
            });
        }
    };
    // Hàm để tăng quantity
    const handleIncrease = (itemId) => {
        if (userState.role === "CUSTOMER") {

            setQuantities((prev) => {
                const updatedQuantity = (prev[itemId] || 0) + 1; // Nếu chưa có giá trị thì mặc định là 0
                handleSave(itemId, updatedQuantity); // Gọi hàm lưu với số lượng đã tăng
                return {
                    ...prev,
                    [itemId]: updatedQuantity,
                };
            });
        }
    };


    // Hàm để giảm quantity
    const handleDecrease = (itemId) => {
        if (userState.role === "CUSTOMER") {

            setQuantities((prev) => {
                const updatedQuantity = Math.max((prev[itemId] || 1) - 1, 1); // Giảm nhưng không nhỏ hơn 1
                handleSave(itemId, updatedQuantity); // Gọi hàm lưu với số lượng đã giảm
                return {
                    ...prev,
                    [itemId]: updatedQuantity,
                };
            });
        }
    };

    const handleSave = async (cartDetailId, quantity) => {
        const newQuantity = quantities[cartDetailId]; // Lấy quantity mới từ state
        const cartDetail = userCart.find((item) => item.cartDetailId === cartDetailId); // Tìm sản phẩm trong danh sách
        if (!cartDetail || !newQuantity) {
            console.log(cartDetailId, quantity);
            toast.error("Dữ liệu không hợp lệ!");
            return;
        }
        try {
            let res = await changeQuantityOfProductToCart(cartDetailId, quantity); // Gọi API cập nhật
            if (res && res.EC === 0) {
                toast.success("Cập nhật số lượng thành công!");
                fetchCart(); // Cập nhật lại giỏ hàng từ backend
            } else {
                toast.error(res.MS || "Cập nhật thất bại!");
            }
        } catch (error) {
            toast.error("Có lỗi khi gọi API!");
        }
    };
    const removeProductOrder = async (cartDetailId) => {
        if (userState.role === "CUSTOMER") {

            let res = await removeProductToCart(cartDetailId);
            if (res.EC === 0) {
                fetchCart();
                toast.success("remove done");
            }
        }
    };

    useEffect(() => {
        fetchListProducts();
    }, []);
    // Hàm tính tổng
    const calculateTotal = () => {
        return userCart.reduce((total, item) => {
            const quantity = quantities[item.cartDetailId] ?? item.quantity; // Lấy quantity từ state hoặc Redux
            return total + item.product.sellingPrice * quantity;
        }, 0);
    };
    const remove = async () => {
        if (userState.role === "CUSTOMER") {
            // Duyệt qua từng cartDetailId và xóa sản phẩm khỏi giỏ hàng
            for (let cartDetail of userCart) {
                let res = await removeProductToCart(cartDetail.cartDetailId);
                if (res.EC === 0) {
                    // Nếu xóa thành công, gọi lại fetchCart để cập nhật giỏ hàng
                    fetchCart();
                } else {
                    // Xử lý trường hợp xóa thất bại
                    toast.error(`Xóa thất bại`);
                }
            }
            // Có thể hiển thị thông báo thành công sau khi xóa tất cả sản phẩm
            toast.success("Đã xóa tất cả sản phẩm khỏi giỏ hàng");
        }
    };


    const handleSubmitOrder = async (event) => {
        if (userState.role === "CUSTOMER") {
            if (userCart.length === 0) {
                toast.error("Không có sản phẩm hợp lệ để đặt hàng.");
                return;
            }
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${account.access_token}`,
                },
            };
            const dataOrder = {
                customerId: account.id,
                staffId: "c86229c6-0181-4d07-8ae2-3086b2ff69f6",
                cartDetails: userCart,
                total: calculateTotal(),
            };
            console.log(dataOrder);
            // Gọi API để tạo đơn hàng
            let res_data = await postCreatePayment(dataOrder, config);
            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
                setPaymentUrl(res_data.paymentUrl);
            }
            if (res_data && res_data.EC !== 0) {
                toast.error(res_data.MS);
            }
        }
    };


    return (
        <div className="PayPage">
            <div className="header-title">Giỏ hàng</div>
            <div className="cart-container">
                <div className="cart-left">
                    <div className="cart-header">
                        <div className="cart-header-product">Tất cả sản phẩm</div>
                        <div className="cart-header-price">Đơn giá (VND)</div>
                        <div className="cart-header-quantity">Số lượng</div>
                        <div className="cart-header-total">Thành tiền (VND)</div>
                        <div className="cart-header-delete">X</div>
                    </div>
                    <div className="cart-items">
                        {!_.isEmpty(userCart) ? (
                            userCart.map((item) => {
                                const quantity = quantities[item.cartDetailId] ?? item.quantity;
                                return (
                                    <div className="cart-item" key={item.cartDetailId}>
                                        <div className="cart-item-product">{item.product.name}</div>
                                        <div className="cart-item-price">{item.product.sellingPrice.toLocaleString("vi-VN")}</div>
                                        <div className="cart-item-quantity">
                                            <CiCircleMinus
                                                className="quantity-button"
                                                onClick={() => handleDecrease(item.cartDetailId)}
                                            />
                                            <span>{quantity}</span>
                                            <CiCirclePlus
                                                className="quantity-button"
                                                onClick={() => handleIncrease(item.cartDetailId)}
                                            />
                                        </div>
                                        <div className="cart-item-total">
                                            {(item.product.sellingPrice * quantity).toLocaleString("vi-VN")}
                                        </div>
                                        <div
                                            className="cart-item-delete"
                                            onClick={() => removeProductOrder(item.cartDetailId)}
                                        >
                                            X
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>Không có sản phẩm</div>
                        )}
                    </div>
                </div>
                <div className="cart-right">
                    <div className="cart-summary">
                        <p>
                            <span>Tạm tính (VND)</span>
                            <span className="cart-summary-price">{calculateTotal().toLocaleString("vi-VN")}</span>
                        </p>
                        <p>
                            <span>Giảm giá (VND)</span>
                            <span className="cart-summary-price">0</span>
                        </p>
                        <p>
                            <span>Thành tiền (VND)</span>
                            <span className="cart-summary-total">{calculateTotal().toLocaleString("vi-VN")}</span>
                        </p>
                        <span className="cart-summary-vat">(Đã bao gồm VAT nếu có)</span>
                    </div>
                    <button className="checkout-button" onClick={handleSubmitOrder}>
                        Tiến hành thanh toán
                    </button>
                    {paymentUrl && (
                        <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
                            <button className="checkout-button vnpay">Thanh toán qua VNPay</button>
                        </a>
                    )}
                    <h4>
                        Số thẻ	9704198526191432198
                    </h4>
                    <h4>
                        Tên chủ thẻ	NGUYEN VAN A
                    </h4>
                    <h4>
                        Ngày phát hành	07/15
                    </h4>
                </div>
            </div>
            <div className="action-buttons">
                <Button className="action-button" onClick={() => navigate("/productFilterPage")}>
                    Xem thêm sản phẩm
                </Button>
                <Button className="action-button" onClick={() => navigate("/")}>
                    Trang chủ
                </Button>
                <Button className="action-button" onClick={() => navigate("/resultPaymentPage")}>
                    Kết quả thanh toán
                </Button>
            </div>
        </div>
    );

};
export default PayPage;
