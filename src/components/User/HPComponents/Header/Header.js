import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./Header.scss";
import { BsCartCheck } from "react-icons/bs";
const Header = (props) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.account.access_token);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);

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
    return (
        <Navbar expand="lg" className="bg-body-tertiary headerContainer">
            <Container>
                <Navbar.Brand>
                    <NavLink to="/" className="nav-link navbar-brand">
                        KAP PC
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
                        <NavLink to="/productFilterPage" className="nav-link">
                            product
                        </NavLink>
                        <NavLink to="/profilePage" className="nav-link">
                            Profile
                        </NavLink>
                        <NavLink to="/blogsPage" className="nav-link">
                            Blogs
                        </NavLink>
                        <NavLink to="/aboutPage" className="nav-link">
                            About Us
                        </NavLink>
                        <NavLink to="/contactPage" className="nav-link">
                            Contact
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
                                <div className="nav-link" onClick={props.toggleDiv}>
                                    <BsCartCheck size={30} className="navbar-nav-cart btn_icon "  />
                                </div>

                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
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
