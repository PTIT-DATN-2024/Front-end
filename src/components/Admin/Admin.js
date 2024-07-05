import Sidebar from "./SideBar/SideBar";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CategogyManagement from "./Managements/CategoryManagement";
// import InfoShopManagement from "./Managements/InfoShopManagement";
// import UserManagement from "./Managements/UserManagement";
// import ProductManagement from "./Managements/ProductManagement";
// import OrderManagement from "./Managements/OrderManagement";
const Admin = (props) => {
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar />
            </div>
            <div className="admin-content">
                <div>day la trang admin</div>
                <Outlet />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                // transition: Bounce
            />
        </div>
    );
};
export default Admin;
