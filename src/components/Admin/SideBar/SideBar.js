import "../../../../node_modules/react-pro-sidebar/dist/css/styles.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaGem,FaHeart, FaHome } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./SideBar.scss"
const Sidebar = (props) => {
    let navigate = useNavigate()
    return (
        <div>
            <ProSidebar>
                <Menu iconShape="square">
                    <MenuItem icon={<FaGem />}>
                        <NavLink to="/admins" className="nav-link">
                            DashBoard
                        </NavLink>
                    </MenuItem>
                    <SubMenu title="Quản lí" icon={<FaHeart />}>
                        <MenuItem>
                            <NavLink to="UserManagement" className="nav-link">
                                UserManagement
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="ProductManagement" className="nav-link">
                                ProductManagement
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="CategogyManagement" className="nav-link">
                                CategogyManagement
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="OrderManagement" className="nav-link">
                                OrderManagement
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="InfoShopManagement" className="nav-link">
                                InfoShopManagement
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="BgImageManagement" className="nav-link">
                                Background Image Management
                            </NavLink>
                        </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<FaHome />}>
                        <NavLink to="/" className="nav-link">
                            home
                        </NavLink>
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </div>
    );
};
export default Sidebar;
