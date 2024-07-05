import axios from "axios";
import { postLogin } from "../../services/apiServices";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.scss";
import { toast } from "react-toastify";
const LogIn = (props) => {
    let navigate = useNavigate()
    const handleSignUp = () => {
        navigate("/signUp");
    };
    const handleLogin = async () => {
        let res_data = await postLogin(userEmail, userPassword);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            navigate("/")
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
            alert("sai");
        }
    };
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    return (
        <div className="main_login">
            <div className="login_header">
                <div className="des_btn">Don't have account </div>
                <button className="btn_signUp" onClick={() => handleSignUp()}>
                    Sign up
                </button>
            </div>
            <div className="form" id="form-1">
                <h3 className="heading">Wellcome!!!</h3>
                {/* <p className="desc">Cùng nhau học nhé ❤️</p> */}
                <div className="form-group">
                    <lable className="form-lable">Email</lable>
                    <input type="text" name="email" id="email" className="form-control" placeholder="VD: email@domain.com.vm" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <lable className="form-lable">Password</lable>
                    <input type="password" name="password" id="password" className="form-control" placeholder="Nhập mật khẩu" value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
                    <span className="form-message"></span>
                </div>
                <button className="form-submit" onClick={() => handleLogin()}>
                    Login
                </button>
                <NavLink to="/" className="nav-link go-back-home">
                    &lt;&lt;Back
                </NavLink>
            </div>
        </div>
    );
};
export default LogIn;
