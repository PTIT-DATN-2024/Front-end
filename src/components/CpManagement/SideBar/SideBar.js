import "../../../../node_modules/react-pro-sidebar/dist/css/styles.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaGem, FaHeart, FaHome } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./SideBar.scss"
const Sidebar = (props) => {
    let navigate = useNavigate()
    return (
        <div>
            <ProSidebar>
                <Menu iconShape="square">
                    <SubMenu title="Dashboard" icon={<FaGem />}>
                        <MenuItem >
                            <NavLink to="/admins" className="nav-link">
                            Ecommerce Dashboard
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="CategogyManagement" className="nav-link">
                            CRM Dashboard
                            </NavLink>
                        </MenuItem>
                    </SubMenu>
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
                                Thông tin, các chương trình
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
                            Home
                        </NavLink>
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </div>
    );
};
export default Sidebar;
