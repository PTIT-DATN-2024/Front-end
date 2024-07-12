import Header from "./Header/Header";
import "./HomePage.scss";
import { Outlet } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useState } from "react";
import CartOrder from "./CartOrder/CartOrder";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import { FaArrowUp } from "react-icons/fa";

const HomePage = (props) => {
    const [isDivVisible, setIsDivVisible] = useState(false);
    const toggleDiv = () => {
        setIsDivVisible(!isDivVisible);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="HomePageContainer">
            <div className="headerContainer">
                <Header />
            </div>

            <button className={` cart_fixIcon ${isDivVisible ? "active" : ""}`} onClick={toggleDiv} style={{
                    zIndex:"100"

                }}>
                <CiShoppingCart size={30} color="#d16f41" style={{ fontWeight: 200 }} className="btn_icon" />
            </button>
            <div className={`listOrderContainer  ${isDivVisible ? "visible" : ""}`}>
                <CartOrder toggleDiv={toggleDiv} />
            </div>

            <div className="mainContainer">
                <Outlet />
            </div>


            <div
                className=""
                style={{
                    cursor: "pointer",
                    position: "fixed",
                    bottom: "20px",
                    left: "20px",
                    backgroundColor: "#00A149", // corrected background color property
                    padding: "10px", // added padding for better clickability
                    borderRadius: "50%", // rounded border for a circle shape
                    zIndex:"100"
                }}
                onClick={() => scrollToTop()}
            >
                <FaArrowUp />
            </div>
            <div className="footerContainer">
                <div className="burger_shape"></div>
                <div className="fry_shape"></div>
                <div className="footerContent"></div>
                <div className="footer_bottom">
                    <p>
                        © Copyright
                        <span className="theme-color-3">2024</span>
                        <a href="https://modinatheme.com/foodking/">Foodking </a>. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
