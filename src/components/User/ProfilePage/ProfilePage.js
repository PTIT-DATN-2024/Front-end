import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import "./ProfilePage.scss";
import { FaUser, FaListAlt, FaHeart, FaArchive, FaFire, FaEye, FaStar, FaComment, FaLock, FaPowerOff } from "react-icons/fa";
import { useEffect } from "react";
import ProfileContent from "../UserComponents/ProfileContent/ProfileContent";


const ProfilePage = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.user.account);
    const stateOrder = useSelector((state) => state.listOrder);
    const [selectedTab, setSelectedTab] = useState("account");

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    useEffect(() => {
        window.scrollTo(0, 0);

    }, []);
    return (
        <div className="ProfilePageContainer">
            <div className="tk-ct-left">
                <div className="header-tk-2021">
                    <img
                        src={account.avatar}
                        alt="A"
                        className="loading"
                        data-was-processed="true"
                    />
                    <div className="header-tk-2021-ct">
                        <span className="txt-tk-1">Tài khoản của</span>
                        <span className="txt-tk-2">nguyễn ngọc anh</span>
                    </div>
                </div>
                <div className="list-tk-2021">
                <div onClick={() => handleTabChange("account")} className={`${selectedTab === "account" ? "current" : ""} item`}>
                        <FaUser className="icon" aria-hidden="true" />
                        <span>Thông tin tài khoản</span>
                    </div>
                    <div onClick={() => handleTabChange("orders")} className={`${selectedTab === "orders" ? "current" : ""} item`}>
                        <FaListAlt className="icon" aria-hidden="true" />
                        <span>Đơn hàng của tôi</span>
                    </div>
                    <div onClick={() => handleTabChange("myReviews")} className={`${selectedTab === "myReviews" ? "current" : ""} item`}>
                        <FaStar className="icon" aria-hidden="true" />
                        <span>Đánh giá của tôi</span>
                    </div>
                    <div onClick={() => handleTabChange("savedProducts")} className={`${selectedTab === "savedProducts" ? "current" : ""} item`}>
                        <FaArchive className="icon" aria-hidden="true" />
                        <span>Sản phẩm mua sau</span>
                    </div>
                    <div onClick={() => handleTabChange("promotions")} className={`${selectedTab === "promotions" ? "current" : ""} item`}>
                        <FaFire className="icon" aria-hidden="true" />
                        <span>Tin khuyến mại</span>
                    </div>
                    <div onClick={() => handleTabChange("viewedProducts")} className={`${selectedTab === "viewedProducts" ? "current" : ""} item`}>
                        <FaEye className="icon" aria-hidden="true" />
                        <span>Sản phẩm đã xem</span>
                    </div>

                    <div onClick={() => handleTabChange("likedProducts")} className={`${selectedTab === "likedProducts" ? "current" : ""} item`}>
                        <FaHeart className="icon" aria-hidden="true" />
                        <span>Sản phẩm đã thích</span>
                    </div>
                    <div onClick={() => handleTabChange("changePassword")} className={`${selectedTab === "changePassword" ? "current" : ""} item`}>
                        <FaLock className="icon" aria-hidden="true" />
                        <span>Thay đổi mật khẩu</span>
                    </div>
                    <div onClick={() => handleTabChange("logout")} className={`${selectedTab === "logout" ? "current" : ""} item`}>
                        <FaPowerOff className="icon" aria-hidden="true" />
                        <span>Đăng xuất tài khoản</span>
                    </div>
                </div>
            </div>

            <div className="tk-ct-right">
                <ProfileContent selectedTab={selectedTab} />
            </div>
        </div>
    );
};

export default ProfilePage;
