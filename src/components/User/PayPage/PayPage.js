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
                payload: res.products,
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
        setQuantities((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1, // Nếu chưa có giá trị thì mặc định là 0
        }));
    };

    // Hàm để giảm quantity
    const handleDecrease = (itemId) => {
        setQuantities((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 1) - 1, 1), // Giảm nhưng không nhỏ hơn 1
        }));
    };
    const handleSave = async (cartDetailId, quantity) => {
        const newQuantity = quantities[cartDetailId]; // Lấy quantity mới từ state
        const cartDetail = userCart.find((item) => item.cartDetailId === cartDetailId); // Tìm sản phẩm trong danh sách
        if (!cartDetail || !newQuantity) {
            console.log(cartDetailId,quantity);
            toast.error("Dữ liệu không hợp lệ!");
            return;
        }
        try {
            let res = await changeQuantityOfProductToCart(cartDetailId,quantity); // Gọi API cập nhật
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
        let res = await removeProductToCart(cartDetailId);
        if (res.EC === 0) {
            fetchCart();
            toast.success("remove done");
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
    };
    
    const handleSubmitOrder1 = async (event) => {
        // Lọc các sản phẩm có CountOrder > 0
        let simplifiedList = stateOrder.listItemsOrder
            .filter(item => item.CountOrder > 0)  // Chỉ giữ lại các sản phẩm có CountOrder > 0
            .map((item) => {
                return {
                    idProduct: item._id,
                    quantity: item.CountOrder,
                    sum: item.sellingprice * item.CountOrder,
                };
            });

        // Nếu không có sản phẩm hợp lệ (CountOrder > 0), không thực hiện submit
        if (simplifiedList.length === 0) {
            toast.error("Không có sản phẩm hợp lệ để đặt hàng.");
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${account.access_token}`,
            },
        };

        const formData = {
            user: account._id,
            listItem: simplifiedList,
            total: stateOrder.total,
        };

        // Gọi API để tạo đơn hàng
        let res_data = await postCreateUserOrder(formData, config);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            remove();
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };
    const handleSubmitOrder = async (event) => {
        // Lọc các sản phẩm có CountOrder > 0
        // Nếu không có sản phẩm hợp lệ (CountOrder > 0), không thực hiện submit
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
    };


    return (
        <>
            <div className="PaylistOrderContent">
                <div className="header">Giỏ hàng</div>
                {/* // */}
                <div className="cart-content-2021">
                    <div className="cart-content-2021-left">
                        <div className="header-cart-ct-left">
                            <div className="cart-col-product">
                                {/* <div className="fake-checkbox" ></div> */}
                                <span>Tất cả sản phẩm </span>
                            </div>
                            <div className="cart-col-price">Đơn giá</div>
                            <div className="cart-col-quantity">Số lượng</div>
                            <div className="cart-col-total-price">Thành tiền</div>
                            <div className="cart-col-delete">
                                <div onClick={remove}>X</div>
                            </div>
                        </div>
                        <div className="cart-list-item">
                            {
                                !_.isEmpty(userCart) ? (
                                    userCart.map((item, index) => {
                                        const quantity = quantities[item.cartDetailId] ?? item.quantity;
                                        return (
                                            <div className="new-cart-items" key={item.cartDetailId}>
                                                <div className="cart-col-product">
                                                    {item.product.name}
                                                </div>
                                                <div className="cart-col-price">
                                                    {item.product.sellingPrice}
                                                </div>
                                                <div className="cart-col-quantity">
                                                    <CiCircleMinus onClick={() => handleDecrease (item.cartDetailId)} size={30} color="#000" style={{ margin: "20px", fontWeight: 500 }} className="btn_icon" />
                                                    <div className={`${item._id} countItem`}> {quantity}</div>
                                                    <CiCirclePlus onClick={() => handleIncrease(item.cartDetailId)} size={30} color="#000" style={{ margin: "20px", fontWeight: 200 }} className="btn_icon" />
                                                </div>
                                                    <FaRegSave  onClick={() => handleSave(item.cartDetailId,quantity)} size={30} color="#000" style={{ margin: "20px", fontWeight: 200 }} className="btn_icon" />
                                                <div className="cart-col-total-price">
                                                    {item.product.sellingPrice* quantity}
                                                </div>
                                                <div className="cart-col-delete" onClick={() => removeProductOrder(item.cartDetailId)} >X
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div>no order</div>
                                )
                            }
                        </div>
                    </div>
                    <div className="cart-content-2021-right">
                        <div class="box-cart-total-price">
                            <p>
                                <span>Tạm tính</span>
                                <span class="total-cart-price">{calculateTotal()}₫</span>
                            </p>
                            <p>
                                <span>Giảm giá</span>
                                <span id="price-discount">0₫</span>
                            </p>
                            <p>
                                <span>Thành tiền</span>
                                <span class="red-b total-cart-payment">{calculateTotal()}₫</span>
                            </p>
                            <span class="cart-vat">(Đã bao gồm VAT nếu có)</span>
                        </div>
                        <button class="button-buy-submit-cart" onClick={() => handleSubmitOrder()}>Tiến hành thanh toán</button>
                        {paymentUrl && (
                            <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
                                <button class="button-buy-submit-cart goVNPay">Thanh toán qua VNPay</button>
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
                <div className="listOrderBottom">
                    <Button
                        variant="success"
                        onClick={() => {
                            navigate("/productFilterPage");
                        }}
                    >
                        Xem thêm sản phẩm
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Trang chủ
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            navigate("/resultPaymentPage");
                        }}
                    >
                        Kết quả thanh toán
                    </Button>

                </div>


            </div>
        </>
    );
};
export default PayPage;
