import { FcPlus } from "react-icons/fc";
import { postSignUp } from "../../services/apiServices";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
const SignUp = (props) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const handleLogIn = () => {
        navigate("/logIn");
    };
    const handleSignUp = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("address", address);
        formData.append("phoneNumber", phoneNumber);
        formData.append("role", "USER");
        formData.append("avatar", avatar);
        let res_data = await postSignUp(formData,config);

        if (res_data && res_data.EC === 0) {
            dispatch({ 
                type: "fetch_user_login_success", 
                payload: res_data 
            });
            toast.success(res_data.MS);
            navigate("/");
        }
        if (res_data && res_data.EC === 1) {
            toast.error(res_data.MS);
        }
        if (res_data && res_data.EC === 2) {
            toast.error(res_data.MS);
        }
    };
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setAvatar(event.target.files[0]);
        } else {
            // setPreviewImage("");
        }
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    // const [role, setRole] = useState("USER");
    const [avatar, setAvatar] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    return (
        <div className="main_signUp">
            <div className="login_header">
                <div className="des_btn">Have an account </div>
                <button className="btn_signUp" onClick={() => handleLogIn()}>
                    Login
                </button>
            </div>
            <div className="form" id="form-1">
                <h3 className="heading">Wellcome!!!</h3>
                <p className="desc">Rất nhiều món ăn ngon đang chờ bạn!</p>
                <div className="form-group">
                    <lable className="form-lable">Email</lable>
                    <input type="email" id="email" className="form-control" placeholder="example@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <lable className="form-lable">Password</lable>
                    <input type="password" id="password" className="form-control" placeholder="********" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <lable className="form-lable">Address</lable>
                    <input type="text" id="address" className="form-control" placeholder="18 Hoàng Quốc VIệt, Cầu Giấy, Hà Nội" value={address} onChange={(event) => setAddress(event.target.value)} />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <lable className="form-lable">Phone Number</lable>
                    <input type="number" id="phoneNumber" className="form-control" placeholder="0123 456 789" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <label className="form-label label_input-file" htmlFor="inputFileUser">
                        <FcPlus />
                        Upload file image
                    </label>
                    <input type="file" className="form-control" hidden id="inputFileUser" onChange={(event) => handleUploadImage(event)} />
                    <span className="form-message"></span>
                </div>
                <div className="form-group col-12  divimg_preview">{previewImage ? <img src={previewImage} alt="" className="previewImage"/> : <span>Preview Image</span>}</div>
                <button className="form-submit" onClick={() => handleSignUp()}>
                    Create free account
                </button>
                <NavLink to="/" className="nav-link go-back-home">
                    &lt;&lt;Back
                </NavLink>
            </div>
        </div>
    );
};
export default SignUp;
