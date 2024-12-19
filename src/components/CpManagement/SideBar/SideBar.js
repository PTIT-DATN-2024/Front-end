import "../../../../node_modules/react-pro-sidebar/dist/css/styles.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaGem, FaHeart, FaHome } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./SideBar.scss"
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
const Sidebar = (props) => {
    let navigate = useNavigate()
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.account.access_token);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    return (
        <ProSidebar>
            <Menu iconShape="square">
                {account.role === "ADMIN" && (
                    <SubMenu title="Thống kê" icon={<FaGem />}>
                        <MenuItem >
                            <NavLink to="/admins" className="nav-link">
                                Thống kê doanh thu
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="CategogyManagement" className="nav-link">
                                Thống kê CRM
                            </NavLink>
                        </MenuItem>
                    </SubMenu>
                )}
                <SubMenu title="Quản lí" icon={<FaHeart />}>
                    <MenuItem>
                        <NavLink to="UserManagement" className="nav-link">
                            Quản lí tài khoản
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="ProductManagement" className="nav-link">
                            Quản lí sản phẩm
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="CategogyManagement" className="nav-link">
                            Quản lí danh mục
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="OrderManagement" className="nav-link">
                            Quản lí đơn hàng
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="InfoShopManagement" className="nav-link">
                            Các chương trình KM
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="BgImageManagement" className="nav-link">
                            Banner và website
                        </NavLink>
                    </MenuItem>
                </SubMenu>
                <MenuItem icon={<FaHome />}>
                    <NavLink to="/" className="nav-link">
                        Trang chủ
                    </NavLink>
                </MenuItem>
            </Menu>
        </ProSidebar>
    );
};
export default Sidebar;
