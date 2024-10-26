import "./App.scss";
import "nprogress/nprogress.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route } from "react-router-dom";

import LogIn from "./components/author/Login";
import SignUp from "./components/author/SignUp";
import UserPage from "./components/User/UserPage";
import MainPage from "./components/User/HomePage/HomePage";
import ProductsPage from "./components/User/ProductsPage/ProductsPage";
import ProductFilterPage from "./components/User/ProductFilterPage/ProductFilterPage";
import BlogsPage from "./components/User/BlogsPage/BlogsPage";
import AboutPage from "./components/User/AboutPage/AboutPage";
import ContactPage from "./components/User/ContactPage/ContactPage";

import Admin from "./components/Admin/Admin";
import DashBoard from "./components/Admin/DashBoard/DashBroad";
import CategogyManagement from "./components/Admin/Managements/CategoryManagament/CategoryManagement";
import InfoShopManagement from "./components/Admin/Managements/InfoShopManagement/InfoShopManagement";
import BgImageManagement from "./components/Admin/Managements/BgImageManagement/BgImageManagement";
import UserManagement from "./components/Admin/Managements/UserManagement/UserManagement";
import ProductManagement from "./components/Admin/Managements/ProductManagement/ProductManagement";
import OrderManagement from "./components/Admin/Managements/OrderManagement/OrderManagement";
import ProfilePage from "./components/Golobal/Profile/ProfilePage";
import { ToastContainer, toast } from "react-toastify";
import PrivateRouter from "./router/PrivateRouter";
import PayPage from "./components/User/PayPage/PayPage";
import SearchPage from "./components/User/SearchPage/SearchPage";
const App = () => {
    return (
        <>
            <div className="App">
                <Routes>
                    <Route path="/" element={<UserPage />}>
                        <Route index element={<MainPage />} />
                        <Route path="productsPage" element={<ProductsPage />} />
                        <Route path="productFilterPage" element={<ProductFilterPage />} />
                        <Route path="blogsPage" element={<BlogsPage />} />
                        <Route path="aboutPage" element={<AboutPage />} />
                        <Route path="contactPage" element={<ContactPage />} />
                        <Route path="productsPage/:id" element={<ProductsPage />}></Route>
                        <Route path="searchPage" element={<SearchPage />} />
                        <Route path="profilePage" element={<ProfilePage />}></Route>
                        <Route path="PayPage" element={<PayPage />}></Route>
                    </Route>
                    <Route
                        path="admins"
                        element={
                            <PrivateRouter>
                                <Admin />
                            </PrivateRouter>
                        }
                    >
                        <Route index element={<DashBoard />} />
                        <Route path="UserManagement" element={<UserManagement />} />
                        <Route path="CategogyManagement" element={<CategogyManagement />} />
                        <Route path="ProductManagement" element={<ProductManagement />} />
                        <Route path="OrderManagement" element={<OrderManagement />} />
                        <Route path="InfoShopManagement" element={<InfoShopManagement />} />
                        <Route path="BgImageManagement" element={<BgImageManagement />} />
                    </Route>
                    <Route path="/logIn" element={<LogIn />}></Route>
                    <Route path="/signUp" element={<SignUp />}></Route>
                </Routes>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                // transition: Bounce
            />
        </>
    );
};

export default App;
