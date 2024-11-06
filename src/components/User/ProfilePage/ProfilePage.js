import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import "./ProfilePage.scss";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postCreateUserOrder } from "../../../services/apiServices";
import { getAllProducts } from "../../../services/apiServices";

const ProfilePage = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.user.account);
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const stateOrder = useSelector((state) => state.listOrder);
    const listCategories = useSelector((state) => state.category.listCategories);
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


    return (
        <div className="PaylistOrderContent">
            12341231


        </div>

    );
};
export default ProfilePage;
