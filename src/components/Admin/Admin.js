import Sidebar from "./SideBar/SideBar";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import React from "react";

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
            
        </div>
    );
};
export default Admin;
