import SidebarStaff from "./SideBarStaff/SideBarStaff";
import "./Staff.scss";
import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header/Header";
import "react-toastify/dist/ReactToastify.css";
import PerfectScrollbar from "react-perfect-scrollbar";
const Staff = (props) => {
    return (
        <div className="homeStaffContainer">
            <Header />
            <div className="staff-container">
                <div className="staff-sidebar">
                    <SidebarStaff />
                </div>
                <div className="staff-content">
                    {/* <PerfectScrollbar> */}
                        <div className="staff_main">
                            <Outlet />
                        </div>
                    {/* </PerfectScrollbar> */}
                </div>

            </div>
        </div>


    );
};
export default Staff;
