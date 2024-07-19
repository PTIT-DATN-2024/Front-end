import "./App.scss";
import "nprogress/nprogress.css";
import { Routes, Route } from "react-router-dom";

import LogIn from "./components/author/Login";
import SignUp from "./components/author/SignUp";
import HomePage from "./components/Homepage/Homepage";
import MainPage from "./components/Homepage/MainPage/MainPage";
import ProductsPage from "./components/Homepage/ProductsPage/ProductsPage";
import ProductFilterPage from "./components/Homepage/ProductFilterPage/ProductFilterPage";
import BlogsPage from "./components/Homepage/BlogsPage/BlogsPage";
import AboutPage from "./components/Homepage/AboutPage/AboutPage";
import ContactPage from "./components/Homepage/ContactPage/ContactPage";

import Admin from "./components/Admin/Admin";
import DashBoard from "./components/Admin/DashBoard/DashBroad";
import CategogyManagement from "./components/Admin/Managements/CategoryManagament/CategoryManagement";
import InfoShopManagement from "./components/Admin/Managements/InfoShopManagement/InfoShopManagement";
import BgImageManagement from "./components/Admin/Managements/BgImageManagement/BgImageManagement";
import UserManagement from "./components/Admin/Managements/UserManagement/UserManagement";
import ProductManagement from "./components/Admin/Managements/ProductManagement/ProductManagement";
import OrderManagement from "./components/Admin/Managements/OrderManagement/OrderManagement";
import ProfilePage from "./components/Profile/ProfilePage";
import { ToastContainer, toast } from "react-toastify";
import PrivateRouter from "./router/PrivateRouter";
import PayPage from "./components/Homepage/PayPage/PayPage";
const App = () => {
    return (
        <>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route index element={<MainPage />} />
                        <Route path="productsPage" element={<ProductsPage />} />
                        <Route path="productFilterPage" element={<ProductFilterPage />} />
                        <Route path="blogsPage" element={<BlogsPage />} />
                        <Route path="aboutPage" element={<AboutPage />} />
                        <Route path="contactPage" element={<ContactPage />} />
                        <Route path="productsPage/:id" element={<ProductsPage />}></Route>
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
