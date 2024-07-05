import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
const HomePage = (props) => {
    return (
        <div className="User">
            <div className="header-container">
                <Header />
            </div>
            <div className="main-container">
                <Outlet />
            </div>
        </div>
    );
};
export default HomePage;
