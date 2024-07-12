import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useSelector } from "react-redux";
const Header = () => {
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
    return (
        <Navbar expand="lg" className="bg-body-tertiary headerContainer">
            <Container>
                <NavLink to="/" className="nav-link navbar-brand">
                    Na's Food
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/admins" className="nav-link">
                            Admin
                        </NavLink>
                        <NavLink to="/productFilterPage" className="nav-link">
                            product
                        </NavLink>
                        <NavLink to="/profilePage" className="nav-link">
                            Profile
                        </NavLink>

                        {/* 
                        <Dropdown data-bs-theme="dark">
                            <Dropdown.Toggle id="dropdown-button-dark-example1" className="nav-link" variant="secondary">
                                Categories
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1" active>
                                    cate1
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">cate2</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">cate3</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-4">onather</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
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
                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    <NavDropdown.Item>Log in</NavDropdown.Item>
                                    <NavDropdown.Item>Log out</NavDropdown.Item>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
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
