import Sidebar from "../CpManagement/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./Admin.scss"
const Admin = (props) => {
    
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar />
            </div>
            <div className="admin-content">
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
