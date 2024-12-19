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
import { getSearchProduct } from "../../../../services/apiServices";
const Header = (props) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.account.access_token);
    const account = useSelector((state) => state.user.account);
    const userCart = useSelector((state) => state.cart.cartItems);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const [suggestions, setSuggestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Thêm trạng thái cho thông báo lỗi
    const searchRef = useRef(null);
    let navigate = useNavigate();
    const handleLogIn = () => {
        navigate("/login");
    };
    const handleSignUp = () => {
        navigate("/SignUp");
    };
    const handleLogOut = async () => {
        dispatch({
            type: "reset_list_user",
        });
        dispatch({
            type: "reset_product",
        });
        dispatch({
            type: "RESET_CART",
        });
        dispatch({
            type: "reset_category",
        });
        dispatch({
            type: "user_logout",
        });
        toast.success("LogOut Successful");
        navigate("/");
    };
    const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = e.target.elements.search.value;
        navigate(`/search?query=${searchQuery}`);
    };
    const fetchSuggestions = async (query) => {
        // Gọi API để lấy danh sách sản phẩm gợi ý
        try {
            const response = await getSearchProduct(query);
            // Kiểm tra mã phản hồi (EC) và xử lý tương ứng
            if (response.EC === 0) {
                // Tìm kiếm thành công
                setSuggestions(response.products);
            } else {
                // Nếu có lỗi trong quá trình tìm kiếm
                // toast.error(response.data.MS); // Hiển thị thông báo lỗi
                setSuggestions([]); // Đặt danh sách gợi ý trống
                setErrorMessage("0 results"); // Hiển thị thông báo "0 kết quả"
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            // toast.error("An error occurred while fetching suggestions."); // Thông báo lỗi chung
            setSuggestions([]); // Đặt danh sách gợi ý trống
            setErrorMessage("0 results"); // Hiển thị thông báo "0 kết quả"
        }
    };
    const handleSearchChange = (e) => {
        const query = e.target.value || '';  // Đảm bảo query luôn là một chuỗi
        setSearchQuery(query);
    
        if (query && query.length > 0) {
            fetchSuggestions(query);  // Gọi API nếu có dữ liệu tìm kiếm
        } else {
            setSuggestions([]);  // Nếu không có dữ liệu, ẩn gợi ý
        }
    };
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSuggestions([]); // Ẩn gợi ý sau khi tìm kiếm
        setErrorMessage(""); // Hiển thị thông báo "0 kết quả"
        navigate(`/searchPage?query=${searchQuery}`);
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
        <Navbar expand="lg" className="bg-body-tertiary headerContainer">
            <Container>
                <Navbar.Brand>
                    <NavLink to="/" className="nav-link navbar-brand">
                        <img src="http://localhost:8080/uploads/categories/logo.png" alt="logo" style={{ height: "80px", width: "160px", objectFit: "contain" }} />
                    </NavLink>
                </Navbar.Brand>
                <div className="navbar-toggler init">
                    <BsCartCheck size={50} className=" navbar-toggler navbar-nav-cart btn_icon" onClick={props.toggleDiv} />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </div>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {(account.role === "CUSTOMER" || account.role === "ADMIN") && (
                            <NavLink to="/" className="nav-link">
                                Trang Chủ
                            </NavLink>
                        )}
                        {(account.role === "CUSTOMER" || account.role === "ADMIN") && (
                            <NavLink to="/productFilterPage" className="nav-link">
                                Sản Phẩm
                            </NavLink>
                        )}
                        {(account.role === "CUSTOMER" || account.role === "ADMIN") && (
                            <NavLink to="/blogsPage" className="nav-link">
                                Bài Viết
                            </NavLink>
                        )}
                        {(account.role === "CUSTOMER" || account.role === "ADMIN") && (
                            <NavLink to="/aboutPage" className="nav-link">
                                Giới thiệu
                            </NavLink>
                        )}
                        {(account.role === "CUSTOMER" || account.role === "ADMIN") && (
                            <NavLink to="/contactPage" className="nav-link">
                                Thông tin liên hệ
                            </NavLink>
                        )}
                        {account.role === "ADMIN" && (
                            <NavLink to="/admins" className="nav-link">
                                Quản Lí !
                            </NavLink>
                        )}
                        {(account.role === "STAFF" || account.role === "ADMIN") && (
                            <NavLink to="/staffs" className="nav-link">
                                Nhân Viên !
                            </NavLink>
                        )}
                    </Nav>
                    {account.role === "CUSTOMER" && (
                        <Form Form ref={searchRef} className="d-flex position-relative box-search" onSubmit={handleSearchSubmit}>
                            <Form.Control type="search" placeholder="Nhập tên sản phẩm ...." className="me-2" name="search" value={searchQuery} onChange={handleSearchChange} aria-label="Search" autoComplete="off" />
                            <Button type="submit" variant="outline-success">
                                Tìm
                            </Button>

                            {/* Suggestions List */}
                            {suggestions.length > 0 ? (
                                <div className="position-absolute suggestion-list">
                                    {suggestions.map((product) => (
                                        <div
                                            key={product._id}
                                            onClick={() => {
                                                navigate(`/productsPage/${product.productId}`);
                                                setSuggestions([]); // Ẩn gợi ý sau khi chọn
                                                setSearchQuery(""); // Reset thanh tìm kiếm
                                            }}
                                            className="list-group-item"
                                        >
                                            <div class="p-img">
                                                <img src={product.productImages[0].image} alt="Laptop Asus VivoBook X1404ZA-NK386W&nbsp;(i3 1215U/8GB RAM/512GB SSD/14 FHD/Win11/Xanh)" />
                                            </div>
                                            <div className="info">
                                                <p class="p-name">{product.name}</p>
                                                <span class="p-price"> {product.sellingPrice.toLocaleString("vi-VN") + " đ"}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                errorMessage && (
                                    <ListGroup className="position-absolute suggestion-list">
                                        <ListGroup.Item>{errorMessage}</ListGroup.Item> {/* Hiển thị thông báo lỗi */}
                                    </ListGroup>
                                )
                            )}
                        </Form>
                    )}
                    {/* Search Bar */}
                    <Nav>
                        {isAuthenticated === false ? (
                            <>
                                <div className="btn-logIn" onClick={() => handleLogIn()}>
                                    Đăng nhập
                                </div>
                                <div className="btn-signUp" onClick={() => handleSignUp()}>
                                    Đăng kí
                                </div>
                            </>
                        ) : (
                            <>
                                {(account.role === "CUSTOMER") && (
                                    <div className="nav-link cart-container" onClick={() => {
                                        navigate("/PayPage");
                                    }}>
                                        <BsCartCheck size={30} className="navbar-nav-cart btn_icon  " />
                                        <div className="cart-count">
                                            {userCart.reduce((total, item) => total + item.quantity, 0)}
                                        </div>
                                    </div>
                                )}
                                <NavDropdown title="Cài đặt" id="basic-nav-dropdown">
                                    <NavDropdown.Item >
                                        <NavLink to="/profilePage" className="nav-link profileInfo" id="profileInfo">
                                            Thông tin tài khoản
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogOut()}>
                                        <NavLink to="" className="nav-link logOut" id="logOut">
                                            Đăng xuất
                                        </NavLink>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default Header;
