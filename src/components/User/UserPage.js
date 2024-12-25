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
import Snowfall from "./UserComponents/Snowfall/Snowfall ";
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
            <Snowfall/> 
            <Header />
            <div className="mainContainer">
                <img src="https://hanoicomputercdn.com/media/banner/18_Decce8a062e27b1a8c935666b15a333383e.png" alt="Banner chạy dọc bên trái" width="215" height="690" class="loading-left" />
                <img src="https://hanoicomputercdn.com/media/banner/06_Dec5d8674a13c8a7e7dbe00570bfaf56d5c.jpg" alt="Banner chạy dọc bên phải" width="215" height="690" class="loading-right"/>
                <Outlet />
                <div class="support-section">
                    <a href="https://www.facebook.com/profile.php?id=61570843770876" class="support-item" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/1024px-Facebook_Messenger_logo_2020.svg.png" alt="Chat Facebook" />
                        <span>Chat Facebook</span>

                    </a>
                    <a href="https://zalo.me/g/dvntbj993" class="support-item" target="_blank">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMDg68zSJU2TpKyMFJwkWpuGsXF_FTMJguqA&s" alt="Chat Zalo" />
                        <span>Chat Zalo</span>

                    </a>
                    <div href="" class="support-item">
                        <img src="https://hidosport.vn/wp-content/uploads/2023/09/call-icon.png" alt="Call Support" />
                        <span>035.339.4062</span>

                    </div>
                </div>

                <ThankCustomer />
            </div>
            <Footer />
        </div>
    );
};

export default UserPage;
