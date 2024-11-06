import "../../../../node_modules/react-pro-sidebar/dist/css/styles.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaGem, FaHeart, FaHome } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
const SidebarStaff = (props) => {
    let navigate = useNavigate()
    return (
        <div>
            <ProSidebar>
                <Menu iconShape="square">
                    <MenuItem icon={<FaGem />}>
                        <NavLink to="/staffs" className="nav-link">
                            Home staff
                        </NavLink>
                    </MenuItem>
                    <SubMenu title="Quản lí" icon={<FaHeart />}>
                        <MenuItem>
                            <NavLink to="OrderManagement" className="nav-link">
                                Quản lí đơn hàng
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="UserManagement" className="nav-link">
                                Quản lí người dùng
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
export default SidebarStaff;
