import { postLogin } from "../../services/apiServices";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
const LogIn = (props) => {
    let navigate = useNavigate();
    
    const dispatch = useDispatch();
    const handleSignUp = () => {
        navigate("/signUp");
    };
    const handleLogin = async () => {
        let dataLogin = {
            email: userEmail,
            password: userPassword,
        };
        let res_data = await postLogin(dataLogin);
        if (res_data && res_data.EC === 0) {
            dispatch({ 
                type: "fetch_user_login_success", 
                payload: res_data 
            });
            toast.success(res_data.MS);
            navigate("/");
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    return (
        <div className="main_login">
            <div className="login_header">
                <div className="des_btn">Bạn chưa có tài khoản? </div>
                <button className="btn_signUp" onClick={() => handleSignUp()}>
                    Đăng kí
                </button>
            </div>
            <div className="form" id="form-1">
                <h3 className="heading">Xin chào!!!</h3>
                <div className="form-group">
                    <lable className="form-lable">Email</lable>
                    <input type="text" name="email" id="email" className="form-control" placeholder="VD: email@domain.com.vm" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <lable className="form-lable">Mật khẩu</lable>
                    <input type="password" name="password" id="password" className="form-control" placeholder="Nhập mật khẩu" value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
                    <span className="form-message"></span>
                </div>
                <button className="form-submit" onClick={() => handleLogin()}>
                    Đăng nhập
                </button>
                <NavLink to="/" className="nav-link go-back-home">
                    &lt;&lt;Quay lại
                </NavLink>
            </div>
        </div>
    );
};
export default LogIn;
