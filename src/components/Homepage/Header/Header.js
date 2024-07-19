import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Header = () => {
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

        // logout phias server

        // const config = {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         authorization: `Bearer ${token}`,
        //     },

        // };
        // let res_data = await postLogin(account._id,config);
        // if (res_data && res_data.EC === 0) {
        //     dispatch({
        //         type: "user_logout",
        //         payload: res_data
        //     });
        //     toast.success(res_data.MS);
        //     navigate("/");
        // }
        // if (res_data && res_data.EC !== 0) {
        //     toast.error(res_data.MS);
        //     alert("errr");
        // }
        dispatch({
            type: "user_logout",
        });
        toast.success("LogOut Successful");
        navigate("/");
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
