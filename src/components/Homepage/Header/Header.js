import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const Header = () => {
    let navigate = useNavigate();
    const handleLogIn = () => {
        navigate("/login");
    };
    const handleSignUp = () => {
        navigate("/SignUp");
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className="nav-link navbar-brand">
                    Food Store
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/page2" className="nav-link">
                            User
                        </NavLink>
                        <NavLink to="/admins" className="nav-link">
                            Admin
                        </NavLink>

                        <Dropdown data-bs-theme="dark">
                            <Dropdown.Toggle id="dropdown-button-dark-example1" className="nav-link" variant="secondary">
                                Categories
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1" active>
                                    Action
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <NavLink to="/admins" className="nav-link">
                            Blogs
                        </NavLink>
                        <NavLink to="/admins" className="nav-link">
                            About us
                        </NavLink>
                        <NavLink to="/admins" className="nav-link">
                            Contact
                        </NavLink>
                    </Nav>
                    <Nav>
                        <button className="btn-logIn" onClick={() => handleLogIn()}>
                            Log in
                        </button>
                        <button className="btn-signUp" onClick={() => handleSignUp()}>
                            Sign up
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
