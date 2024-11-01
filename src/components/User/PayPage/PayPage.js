import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import "./PayPage.scss";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postCreateUserOrder } from "../../../services/apiServices";

const PayPage = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.user.account);
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
            payload: {productId,quantity:1}
        });
        toast.success("add done +1");
        // console.log(listProducts);
        console.log(stateProduct);
    };
    const removeProductOrder = async (productId) => {
        dispatch({
            type: "decrement_product",
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
    const handleSubmitOrder = async (event) => {
        // validate
        // callapi
        let simplifiedList = stateOrder.listItemsOder.map((item) => {
            return {
                idProduct: item._id,
                quantity: item.CountOrder,
                sum: item.sellingprice * item.CountOrder,
            };
        });
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
        // formData.append("user", account._id);
        // formData.append("listItem", stateOrder.listItemsOder);
        // formData.append("Total", stateOrder.total);
        // console.log(formData);

        let res_data = await postCreateUserOrder(formData,config);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            remove();
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };

    return (
        <>
            <div className="PaylistOrderContent">
                <div className="header">List Order</div>

                <div>
                    <button onClick={remove}> remove</button>
                </div>
                <div className="listOrderTable">
                    <Table striped bordered hover responsive="xl">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Note</th>
                                <th>price</th>
                                <th>Count</th>
                                <th>$</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!_.isEmpty(stateOrder.listItemsOder) ? (
                                stateOrder.listItemsOder.map((item, index) => {
                                    return (
                                        <tr key={`table_product_${index}`}>
                                            <td className="table_orderItem">{index + 1}</td>
                                            <td className="table_orderItem">{item.name}</td>
                                            <td className="table_orderItem">{item.description}</td>
                                            <td className="table_orderItem">{item.sellingprice}</td>
                                            <td className="table_orderItem table_orderItemCount">
                                                <CiCircleMinus onClick={() => removeProductOrder(item._id)} size={30} color="#000" style={{ margin: "20px", fontWeight: 500 }} className="btn_icon" />
                                                <div className={`${item._id} countItem`}> {item.CountOrder}</div>
                                                <CiCirclePlus onClick={() => addProductOrder(item._id)} size={30} color="#000" style={{ margin: "20px", fontWeight: 200 }} className="btn_icon" />
                                            </td>
                                            <td className="table_orderItem">{item.sellingprice * item.CountOrder}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <div>no order</div>
                            )}
                        </tbody>
                    </Table>
                </div>

                <div>Total:{stateOrder.total}</div>
                <div className="listOrderBottom">
                    <Button
                        variant="secondary"
                        onClick={() => {
                            navigate("/productFilterPage");
                        }}
                    >
                        ADD more product
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Home
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitOrder()}>
                        Pay
                    </Button>
                </div>
            </div>
        </>
    );
};
export default PayPage;
