import Header from "./Header/Header";
import "./HomePage.scss"
import { Outlet } from "react-router-dom";
const HomePage = (props) => {
    return (
        <div className="HomePageContainer">
            <div className="headerContainer">
                <Header />
            </div>
            <div className="mainContainer">
                <Outlet />
            </div>
        </div>
    );
};
export default HomePage;
