import "./App.scss";
import "nprogress/nprogress.css";
import { Routes, Route } from "react-router-dom";

import LogIn from "./components/author/Login";
import SignUp from "./components/author/SignUp";
import HomePage from "./components/Homepage/Homepage";
import MainPage from "./components/Homepage/MainPage/MainPage";
import ProductsPage from "./components/Homepage/ProductsPage/ProductsPage";
import CategoriesPage from "./components/Homepage/CategoriesPage/CategoriesPage";
import BlogsPage from "./components/Homepage/BlogsPage/BlogsPage";
import AboutPage from "./components/Homepage/AboutPage/AboutPage";
import ContactPage from "./components/Homepage/ContactPage/ContactPage";

import Admin from "./components/Admin/Admin";
import DashBoard from "./components/Admin/DashBoard/DashBroad";
import CategogyManagement from "./components/Admin/Managements/CategoryManagament/CategoryManagement";
import InfoShopManagement from "./components/Admin/Managements/InfoShopManagement/InfoShopManagement";
import UserManagement from "./components/Admin/Managements/UserManagement/UserManagement";
import ProductManagement from "./components/Admin/Managements/ProductManagement/ProductManagement";
import OrderManagement from "./components/Admin/Managements/OrderManagement/OrderManagement";
import ProfilePage from "./components/Profile/ProfilePage";
import ItemPage from "./components/Homepage/ItemPage/ItemPage";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
    return (
        <>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route index element={<MainPage />} />
                        <Route path="productsPage" element={<ProductsPage />} />
                        <Route path="categoriesPage" element={<CategoriesPage />} />
                        <Route path="blogsPage" element={<BlogsPage />} />
                        <Route path="aboutPage" element={<AboutPage />} />
                        <Route path="contactPage" element={<ContactPage />} />
                        <Route path="productsPage" element={<ProductsPage />}></Route>
                        <Route path="profilePage" element={<ProfilePage />}></Route>
                        <Route path="itemPage" element={<ItemPage />}></Route>
                    </Route>
                    <Route path="admins" element={<Admin />}>
                        <Route index element={<DashBoard />} />
                        <Route path="UserManagement" element={<UserManagement />} />
                        <Route path="CategogyManagement" element={<CategogyManagement />} />
                        <Route path="ProductManagement" element={<ProductManagement />} />
                        <Route path="OrderManagement" element={<OrderManagement />} />
                        <Route path="InfoShopManagement" element={<InfoShopManagement />} />
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
