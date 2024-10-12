import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import "./CartOrder.scss";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CartOrder = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateProduct = useSelector((state) => state.product);

    const listCategories = useSelector((state) => state.category.listCategories);
    const listProducts = useSelector((state) => state.product.listProducts);
    const stateOrder = useSelector((state) => state.listOrder);
    const updateStateOrder = () => {
        const productsToOrder = listProducts.filter((product) => product.CountOrder > 0);
        dispatch({
            type: "Update_order_user",
            payload: productsToOrder,
        });
    };
    const addProductOrder = async (productId) => {
        dispatch({
            type: "add_product",
            payload: productId,
        });

        toast.success("add done");
        // console.log(listProducts);
        console.log(stateProduct);
    };
    const removeProductOrder = async (productId) => {
        dispatch({
            type: "remove_product",
            payload: productId,
        });
        toast.success("remove done");
        // console.log(listProducts);
        console.log(stateProduct);
    };
    useEffect(() => {
        updateStateOrder();
    }, [listProducts]);
    const remove = async () => {
        try {
            await dispatch({
                type: "reset_order_counts",
            });
            console.log("listItemsOder", stateOrder.listItemsOder);
            toast.success("clear done!");
        } catch (error) {
            console.error("Failed to clear order:", error);
            toast.error("Failed to clear order.");
        }
    };

    return (
        <>
            <div className="listOrderContent">
                <div className="header">List Order</div>


                <div className="listOrderTable">
                    {!_.isEmpty(stateOrder.listItemsOder) &&
                    (
                        <div className="header">
                            <div className="item product"></div>
                            <div className="item name">Name</div>
                            <div className="item price"></div>
                            <div className="item count"></div>
                            <div className="item sum">$</div>
                        </div>
                    )}
                    <div className="body">
                        {!_.isEmpty(stateOrder.listItemsOder) ? (
                            stateOrder.listItemsOder.map((item, index) => {
                                return (
                                    <div key={`table_product_${index}`} className="orderItem">
                                        <div className="item product">{index + 1}</div>
                                        <div className="item name">{item.name}</div>
                                        <div className="item price">{item.sellingprice} đ</div>
                                        <div className="item count">
                                            <CiCircleMinus onClick={() => removeProductOrder(item._id)} size={20} color="#000" style={{ margin: "0", fontWeight: 200 }} className="btn_icon" />
                                            <div className={`${item._id} countItem`}> {item.CountOrder}</div>
                                            <CiCirclePlus onClick={() => addProductOrder(item._id)} size={20} color="#000" style={{ margin: "0", fontWeight: 200 }} className="btn_icon" />
                                        </div>
                                        <div className="item sum">{item.sellingprice * item.CountOrder} đ</div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="noOrder">No order</div>
                        )}
                    </div>
                </div>

                <div className="total">Total: {stateOrder.total} đ</div>
                <FaRegTrashCan onClick={remove} className="remove" />
                <div className="listOrderBottom">
                    <Button variant="secondary" onClick={() => props.toggleDiv()} className="item close">
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            props.toggleDiv();
                            navigate("/PayPage");
                        }}
                        className="item pay"
                    >
                        Pay
                    </Button>
                </div>
            </div>
        </>
    );
};
export default CartOrder;
