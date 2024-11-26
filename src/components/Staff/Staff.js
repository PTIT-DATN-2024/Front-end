import "./Staff.scss";
import { Outlet } from "react-router-dom";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Sidebar from "../CpManagement/SideBar/SideBar";
const Staff = (props) => {
    return (
        <div className="staff-container">
            <div className="staff-sidebar">
                <Sidebar />
            </div>
            <div className="staff-content">
                <PerfectScrollbar>
                    <div className="staff_main">
                        <Outlet />
                    </div>
                </PerfectScrollbar>
            </div>
        </div>
    );
};
export default Staff;
