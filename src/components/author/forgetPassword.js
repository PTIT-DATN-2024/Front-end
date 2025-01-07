import { forgetPassword } from "../../services/apiServices";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const ForgetPassword = (props) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = () => {
        navigate("/signUp");
    };
    const handleLogIn = () => {
        navigate("/logIn");
    };
    const submitEmail = async () => {
        const data ={
            email: userEmail
        }
        let res_data = await forgetPassword(data);
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

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            submitEmail();
        }
    };

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    return (
        <div className="main_login">
            <div className="login_header">
                {/* <div className="des_btn">Bạn chưa có tài khoản? </div> */}
                <button className="btn_signUp" onClick={() => handleSignUp()}>
                    Đăng kí
                </button>
                <button className="btn_signUp" onClick={() => handleLogIn()}>
                    Đăng nhập
                </button>
            </div>
            <div className="form" id="form-1">
                <h3 className="heading2">Nhập email để cấp lại mật khẩu</h3>
                <div className="form-group">
                    <label className="form-lable">Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        className="form-control" 
                        placeholder="VD: email@domain.com.vm" 
                        value={userEmail} 
                        onChange={(event) => setUserEmail(event.target.value)} 
                        onKeyDown={handleKeyDown} 
                    />
                    <span className="form-message"></span>
                </div>

                <button className="form-submit" onClick={() => submitEmail()}>
                    Gửi mật khẩu mới
                </button>
                <NavLink to="/" className="nav-link go-back-home">
                    &lt;&lt;Quay lại
                </NavLink>
            </div>
        </div>
    );
};

export default ForgetPassword;
