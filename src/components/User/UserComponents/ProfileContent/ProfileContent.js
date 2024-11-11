import React from "react";
import Account from "./Account/Account";
import MyOrder from "./MyOrder/MyOrder"
import MyReview from "./MyReview/MyReview";
const ProfileContent = ({ selectedTab }) => {
    return (
        <div className="profile-content">
            {selectedTab === "account" && <Account />}
            {selectedTab === "orders" && <MyOrder />}
            {selectedTab === "myReviews" && <MyReview />}
            {selectedTab === "savedProducts" && (
                <div>
                    <h2>Sản phẩm mua sau</h2>
                    {/* Nội dung sản phẩm mua sau */}
                </div>
            )}
            {selectedTab === "promotions" && (
                <div>
                    <h2>Tin khuyến mại</h2>
                    {/* Nội dung tin khuyến mại */}
                </div>
            )}
            {selectedTab === "viewedProducts" && (
                <div>
                    <h2>Sản phẩm đã xem</h2>
                    {/* Nội dung sản phẩm đã xem */}
                </div>
            )}
            {selectedTab === "likedProducts" && (
                <div>
                    <h2>Sản phẩm đã thích</h2>
                    {/* Nội dung sản phẩm đã thích */}
                </div>
            )}
            {selectedTab === "changePassword" && (
                <div>
                    <h2>Thay đổi mật khẩu</h2>
                    {/* Nội dung thay đổi mật khẩu */}
                </div>
            )}
            {selectedTab === "logout" && (
                <div>
                    <h2>Đăng xuất tài khoản</h2>
                    {/* Nội dung đăng xuất */}
                </div>
            )}
        </div>
    );
};

export default ProfileContent;
