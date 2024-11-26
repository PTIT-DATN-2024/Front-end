import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { getAllUsers } from '../../../services/apiServices';
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from '../../../services/apiServices';
import { postCreateUserOrder } from '../../../services/apiServices';

import "./HomeStaff.scss"
const HomeStaff = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.user.account);
    const token = useSelector((state) => state.user.account.access_token);
    const listUsers = useSelector((state) => state.listUser.users);
    const [isExistingCustomer, setIsExistingCustomer] = useState(null);
    const [email, setEmail] = useState('');
    const [customerInfo, setCustomerInfo] = useState(null);
    const [products, setProducts] = useState([]);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const stateProduct = useSelector((state) => state.product);
    const listProducts = useSelector((state) => state.product.listProducts);
    const stateOrder = useSelector((state) => state.listOrder);
    const listCategories = useSelector((state) => state.category.listCategories);
    const fetchListUsers = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`, // Đặt token vào header Authorization
            },
        };
        let res = await getAllUsers(config);
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_users",
                payload: res.users,
            });
            toast.success(res.MS);
        }
    };
    useEffect(() => {
        fetchListUsers();
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
            user: customerInfo._id,
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
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    // Hàm lọc người dùng từ listUsers theo email hoặc số điện thoại
    const filteredUsers = listUsers.filter((user) => {
        const query = searchQuery.toLowerCase();
        return (
            user.email.toLowerCase().includes(query) ||
            user.phoneNumber.includes(query)
        );
    });
    // Chọn khách hàng
    const handleSelectCustomer = (user) => {
        setCustomerInfo(user);
        // setSearchQuery("?"); // Xóa ô tìm kiếm sau khi chọn khách hàng
    };
    // Mở modal tạo tài khoản mới
    const handleCreateNewUser = () => {
        setShowModalCreateUser(true);
    };
    return (
        <div className="HomeStaff-container">
                Home Staff
        </div>
    );
};

export default HomeStaff;
