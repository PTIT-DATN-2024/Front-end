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
import { getAllProducts } from "../../../services/apiServices";

const PayPage = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.user.account);
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const stateOrder = useSelector((state) => state.listOrder);
    const listCategories = useSelector((state) => state.category.listCategories);
    const [paymentUrl, setPaymentUrl] = useState("");
    useEffect(() => {
        window.scrollTo(0, 0);

    }, []);
    const updateStateOrder = () => {
        dispatch({
            type: "Update_order_user",
            payload: listProducts,
        });
    };
    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_product",
                payload: res.products,
            });


        }
    };
    const addProductOrder = async (productId) => {
        dispatch({
            type: "add_product_to_order",
            payload: { productId, quantity: 1 }
        });
        toast.success("add done +1");
        console.log(stateOrder);

    };
    const decremeneProductOrder = async (productId) => {
        dispatch({
            type: "decrement_product_in_order",
            payload: productId,
        });
        toast.success("decre done");
    };
    const removeProductOrder = async (productId) => {
        dispatch({
            type: "remove_product_from_order",
            payload: productId,
        });
        toast.success("remove done");
    };
    useEffect(() => {
        fetchListProducts();
    }, []);
    useEffect(() => {
        updateStateOrder();
    }, [listProducts]);
    const remove = async () => {
        try {
            await dispatch({
                type: "Clear_order_user",
            });
            toast.success("clear done!");
        } catch (error) {
            toast.error("Failed to clear order.");
        }
        console.log(stateOrder);
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
        let config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${account.access_token}`,
            },
        };
        const dataOrder = {
            user: account._id,
            listItem: simplifiedList,
            total: stateOrder.total,
        };
        let formData = {
            "amount": stateOrder.total,// Số tiền thanh toán (VND)
            "orderInfo": "thanh toan 12345",  // Mô tả đơn hàng
            dataOrder: dataOrder
        }

        // Gọi API để tạo đơn hàng
        let res_data = await postCreatePayment(formData, config);
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
                                !_.isEmpty(stateOrder.listItemsOrder) ? (
                                    stateOrder.listItemsOrder.filter(item => item.CountOrder > 0).map((item, index) => {
                                        return (
                                            <div className="new-cart-items" key={item._id}>
                                                <div className="cart-col-product">
                                                    {item.name}
                                                </div>
                                                <div className="cart-col-price">
                                                    {item.sellingprice}
                                                </div>
                                                <div className="cart-col-quantity">
                                                    <CiCircleMinus onClick={() => decremeneProductOrder(item._id)} size={30} color="#000" style={{ margin: "20px", fontWeight: 500 }} className="btn_icon" />
                                                    <div className={`${item._id} countItem`}> {item.CountOrder}</div>
                                                    <CiCirclePlus onClick={() => addProductOrder(item._id)} size={30} color="#000" style={{ margin: "20px", fontWeight: 200 }} className="btn_icon" />
                                                </div>
                                                <div className="cart-col-total-price">
                                                    {item.sellingprice * item.CountOrder}
                                                </div>
                                                <div className="cart-col-delete" onClick={() => removeProductOrder(item._id)} >X
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
                                <span class="total-cart-price">{stateOrder.total}₫</span>
                            </p>
                            <p>
                                <span>Giảm giá</span>
                                <span id="price-discount">0₫</span>
                            </p>
                            <p>
                                <span>Thành tiền</span>
                                <span class="red-b total-cart-payment">{stateOrder.total}₫</span>
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
