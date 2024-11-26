import Header from "./UserComponents/Header/Header";
import "./UserPage.scss";
import { Outlet } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useEffect, useState } from "react";
import Footer from "./UserComponents/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import { FaArrowUp } from "react-icons/fa";
import { postLogin } from "../../services/apiServices";
import ThankCustomer from "./UserComponents/ThankCustomer/ThankCustomer";
const UserPage = (props) => {
    const dispatch = useDispatch();

    const autoLoginforCode = async () => {
        let datalogin = {
            email: "a",
            password: "1",
        };
        let res_data = await postLogin(datalogin);
        if (res_data && res_data.EC === 0) {
            dispatch({
                type: "fetch_user_login_success",
                payload: res_data,
            });
            toast.success(res_data.MS);
            // navigate("/");
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
            alert("incorrect");
        }
    };


    useEffect(() => {
        // autoLoginforCode();
    }, []);
    return (
        <div className="HomePageContainer">
            <Header />
            <div className="mainContainer">
                <Outlet />
                <ThankCustomer />
            </div>
            <Footer />
        </div>
    );
};

export default UserPage;
