import Header from "./HPComponents/Header/Header";
import "./HomePage.scss";
import { Outlet } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useEffect, useState } from "react";
import CartOrder from "./HPComponents/CartOrder/CartOrder";
import Footer from "./HPComponents/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import { FaArrowUp } from "react-icons/fa";
import { postLogin } from "../../services/apiServices";
const HomePage = (props) => {
    const dispatch = useDispatch();
    const [isDivVisible, setIsDivVisible] = useState(false);
    const toggleDiv = () => {
        setIsDivVisible(!isDivVisible);
        // if (!isDivVisible) {
        //     document.body.classList.add("no-scroll");
        // } else {
        //     document.body.classList.remove("no-scroll");
        // }
    };
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
            <Header toggleDiv={toggleDiv} />
            <div className={`listOrderContainer  ${isDivVisible ? "visible" : ""}`}>
                <CartOrder toggleDiv={toggleDiv} />
            </div>
            <div className="mainContainer">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
