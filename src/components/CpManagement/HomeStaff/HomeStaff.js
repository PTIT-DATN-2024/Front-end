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
            // toast.success(res.MS);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);

    }, []);
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

    useEffect(() => {
        fetchListProducts();
    }, []);
    useEffect(() => {
        updateStateOrder();
    }, [listProducts]);

    return (
        <div className="HomeStaff-container">
                Home Staff
        </div>
    );
};

export default HomeStaff;
