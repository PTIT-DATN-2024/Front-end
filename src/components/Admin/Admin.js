import Sidebar from "./SideBar/SideBar";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PerfectScrollbar from "react-perfect-scrollbar";
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
                <div className="admin_header">admin-header</div>
                <PerfectScrollbar>
                    <div className="admin_main">
                        <Outlet />
                    </div>
                </PerfectScrollbar>
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
