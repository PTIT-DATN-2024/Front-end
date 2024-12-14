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
import ProfilePage from "./components/User/ProfilePage/ProfilePage";
import PayPage from "./components/User/PayPage/PayPage";
import SearchPage from "./components/User/SearchPage/SearchPage";
import ResultPaymentPage from "./components/User/ResultPaymentPage/ResultPaymentPage";

import Admin from "./components/Admin/Admin";
import DashBoard from "./components/CpManagement/DashBoard/DashBroad";
import CategogyManagement from "./components/CpManagement/CategoryManagament/CategoryManagement";
import InfoShopManagement from "./components/CpManagement/InfoShopManagement/InfoShopManagement";
import BgImageManagement from "./components/CpManagement/BgImageManagement/BgImageManagement";
import UserManagement from "./components/CpManagement/UserManagement/UserManagement";
import ProductManagement from "./components/CpManagement/ProductManagement/ProductManagement";
import OrderManagement from "./components/CpManagement/OrderManagement/OrderManagement";

import Staff from "./components/Staff/Staff";
import HomeStaff from "./components/CpManagement/HomeStaff/HomeStaff";
import { ToastContainer, toast } from "react-toastify";
import PrivateRouter from "./router/PrivateRouter";

const App = () => {
    return (
        <>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <PrivateRouter allowedRoles={["ADMIN", "STAFF", "CUSTOMER"]}>
                            <UserPage />
                        </PrivateRouter>
                    }>
                        <Route index element={<MainPage />} />
                        <Route path="aboutPage" element={<AboutPage />} />
                        <Route path="blogsPage" element={<BlogsPage />} />
                        <Route path="contactPage" element={<ContactPage />} />
                        <Route path="productsPage" element={<ProductsPage />} />
                        <Route path="productFilterPage" element={<ProductFilterPage />} />
                        <Route path="productsPage/:id" element={<ProductsPage />} />
                        <Route path="PayPage" element={<PayPage />}></Route>
                        <Route path="searchPage" element={<SearchPage />} />
                        <Route path="profilePage" element={<ProfilePage />} />
                        <Route path="resultPaymentPage" element={<ResultPaymentPage />} />
                    </Route>
                    <Route
                        path="admins"
                        element={
                            <PrivateRouter allowedRoles={["ADMIN"]}>
                                <Admin />
                            </PrivateRouter>
                        }
                    >
                        {/* <Route index element={<DashBoard />} /> */}
                        <Route index element={<UserManagement />} />
                        <Route path="UserManagement" element={<UserManagement />} />
                        <Route path="CategogyManagement" element={<CategogyManagement />} />
                        <Route path="ProductManagement" element={<ProductManagement />} />
                        <Route path="OrderManagement" element={<OrderManagement />} />
                        <Route path="InfoShopManagement" element={<InfoShopManagement />} />
                        <Route path="BgImageManagement" element={<BgImageManagement />} />
                    </Route>
                    <Route
                        path="staffs"
                        element={
                            <PrivateRouter allowedRoles={["STAFF", "ADMIN"]}>
                                <Staff />
                            </PrivateRouter>
                        }
                    >
                        <Route index element={<HomeStaff />} />
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
                autoClose={2000}
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
