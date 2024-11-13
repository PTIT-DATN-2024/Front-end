import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./Header.scss";
import { BsCartCheck } from "react-icons/bs";
import { getSearchProduct } from "../../../services/apiServices"; 
const Header = (props) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.account.access_token);

    const stateOrder = useSelector((state) => state.listOrder);
    const [suggestions, setSuggestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Thêm trạng thái cho thông báo lỗi
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const searchRef = useRef(null);

    // console.log(isAuthenticated, account);
    let navigate = useNavigate();
    const handleLogIn = () => {
        navigate("/login");
    };
    const handleSignUp = () => {
        navigate("/SignUp");
    };
    const handleLogOut = async () => {
        dispatch({
            type: "user_logout",
        });
        toast.success("LogOut Successful");
        navigate("/");
    };
    const gotoProfilePage = () => {
        navigate("/");
    };
    useEffect(() => {
        // Đóng danh sách gợi ý khi nhấp ra ngoài
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSuggestions([]); // Đóng danh sách gợi ý
                setErrorMessage(""); // Hiển thị thông báo "0 kết quả"
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <Navbar expand="lg" className="bg-body-tertiary admin-headerContainer">
            <Container>
                <Navbar.Brand>
                    <NavLink to="/" className="nav-link navbar-brand">
                        <img src="/v1/uploads/bgImages/1729231869739.png" alt="logo" style={{ height: "80px", width: "160px", objectFit: "contain" }} />
                    </NavLink>
                </Navbar.Brand>
                <div className="navbar-toggler init">
                    <BsCartCheck size={50} className=" navbar-toggler navbar-nav-cart btn_icon" onClick={props.toggleDiv} />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </div>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        {account.role === "ADMIN" && (
                            <NavLink to="/admins" className="nav-link">
                                Admin
                            </NavLink>
                        )}
                        <NavLink to="/staffs" className="nav-link">
                            Staff
                        </NavLink>
                        <NavLink to="/productFilterPage" className="nav-link">
                            product
                        </NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ? (
                            <>
                                <button className="btn-logIn" onClick={() => handleLogIn()}>
                                    Log in
                                </button>
                                <button className="btn-signUp" onClick={() => handleSignUp()}>
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="nav-link cart-container" onClick={() => {
                                    navigate("/PayPage");
                                }}>
                                    <BsCartCheck size={30} className="navbar-nav-cart btn_icon  " />
                                    <div className="cart-count">
                                        {stateOrder.listItemsOrder.reduce((total, item) => total + item.CountOrder, 0)}
                                    </div>
                                </div>

                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    <NavDropdown.Item >
                                        <NavLink to="/profilePage" className="nav-link">
                                            Profile
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogOut()}>Log out</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
