import { FcPlus } from "react-icons/fc";
import { postCreateUser } from "../../services/apiServices";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.scss";
import { toast } from "react-toastify";
const SignUp = (props) => {
    let navigate = useNavigate();
    const handleLogIn = () => {
        navigate("/logIn");
    };
    const handleSignUp = async () => {
        let res_data = await postCreateUser(email, password, address, phoneNumber, "USER", avatar);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            alert("11111");
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
            alert("asdasd");
        }
    };
    const handleUploadImage = (event) => {
        // `data:image/jpeg;base64,${data}`
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
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
        <div className="main_login">
            <div className="login_header">
                <div className="des_btn">Have an account </div>
                <button className="btn_signUp" onClick={() => handleLogIn()}>
                    Login
                </button>
            </div>
            <div className="form" id="form-1">
                <h3 className="heading">Wellcome!!!</h3>
                {/* <p className="desc">Cùng nhau học nhé ❤️</p> */}
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
                    <lable className="form-lable">
                        <FcPlus />
                        Upload file image
                    </lable>
                    <input type="file" className="form-control" hidden id="inputFileUser" onChange={(event) => handleUploadImage(event)} />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">{previewImage ? <img src={previewImage} alt="" /> : <span>Preview Image</span>}</div>
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
