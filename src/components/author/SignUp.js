import { FcPlus } from "react-icons/fc";
import { postSignUp } from "../../services/apiServices";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import validateFields from "../Golobal/validate";
const SignUp = (props) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const handleLogIn = () => {
        navigate("/logIn");
    };
    const handleBlur = (field, value) => {
        const newErrors = { ...errors, ...validateFields({ [field]: value }) };
        setErrors(newErrors);
    };

    const handleFocus = (field) => {
        const newErrors = { ...errors };
        newErrors[field] = "";
        setErrors(newErrors);
    };
    const handleSignUp = async () => {
        const dataValidate = {
            email: email,
            password: password,
            usename: username,
            fullName: fullName,
            address: address,
            phoneNumber: phoneNumber,
        };
        const newErrors = { ...errors, ...validateFields(dataValidate) };
        setErrors(newErrors);
        const allFieldsEmpty = Object.values(errors).every((value) => value === "");
        if (allFieldsEmpty) {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("username", username);
            formData.append("fullName", fullName);
            formData.append("address", address);
            formData.append("phone", phoneNumber);
            formData.append("role", "CUSTOMER");
            if (avatar !== null) {

                formData.append("avatar", avatar);
            }
            let res_data = await postSignUp(formData, config);

            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
                navigate("/logIn");
            }
            if (res_data && res_data.EC !== 0) {
                toast.error(res_data.MS);
            }
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
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    // const [role, setRole] = useState("USER");
    const [avatar, setAvatar] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});

    return (
        <div className="main_signUp">
            <div className="login_header">
                <div className="des_btn">Bạn đã có tài khoản? </div>
                <button className="btn_signUp" onClick={() => handleLogIn()}>
                    Đăng nhập
                </button>
            </div>
            <div className="form" id="form-1">
                <h3 className="heading">Xin chào!!!</h3>
                <p className="desc">Rất nhiều ưu đãi đang chờ bạn!</p>
                <div className="form-group">
                    <lable className="form-lable">Email</lable>
                    <input type="email" id="email" className="form-control" placeholder="nguyenvana@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} onBlur={() => handleBlur("email", email)}
                        onFocus={() => handleFocus("email")} />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <lable className="form-lable">Mật khẩu</lable>
                    <input type="password" id="password" className="form-control" placeholder="********" value={password} onChange={(event) => setPassword(event.target.value)} onBlur={() => handleBlur("password", password)}
                        onFocus={() => handleFocus("password")} />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="form-group">
                    <lable className="form-lable">Username</lable>
                    <input type="text" id="username" className="form-control" placeholder="NguyenA" value={username} onChange={(event) => setUsername(event.target.value)} onBlur={() => handleBlur("username", username)}
                        onFocus={() => handleFocus("username")} />
                    {errors.username && <div className="text-danger">{errors.username}</div>}
                </div>
                <div className="form-group">
                    <lable className="form-lable">Tên đầy đủ</lable>
                    <input type="text" id="fullname" className="form-control" placeholder="NguyenA" value={fullName} onChange={(event) => setFullName(event.target.value)} onBlur={() => handleBlur("fullName", fullName)}
                        onFocus={() => handleFocus("fullName")} />
                    {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
                </div>
                <div className="form-group">
                    <lable className="form-lable">Địa chỉ</lable>
                    <input type="text" id="address" className="form-control" placeholder="18 Hoàng Quốc VIệt, Cầu Giấy, Hà Nội" value={address} onChange={(event) => setAddress(event.target.value)} onBlur={() => handleBlur("address", address)}
                        onFocus={() => handleFocus("address")} />
                    {errors.address && <div className="text-danger">{errors.address}</div>}
                </div>
                <div className="form-group">
                    <lable className="form-lable">Số điện thoại</lable>
                    <input type="number" id="phoneNumber" className="form-control" placeholder="0123 456 789" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} onBlur={() => handleBlur("phoneNumber", phoneNumber)}
                        onFocus={() => handleFocus("phoneNumber")} />
                    {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                </div>
                <div className="form-group">
                    <label className="form-label label_input-file" htmlFor="inputFileUser">
                        <FcPlus />
                        Tải ảnh lên
                    </label>
                    <input type="file" className="form-control" hidden id="inputFileUser" onChange={(event) => handleUploadImage(event)} />
                    <span className="form-message"></span>
                </div>
                <div className="form-group col-12  divimg_preview">{previewImage ? <img src={previewImage} alt="" className="previewImage" /> : <span></span>}</div>
                <button className="form-submit" onClick={() => handleSignUp()}>
                    Tạo tài khoản
                </button>
                <NavLink to="/" className="nav-link go-back-home">
                    &lt;&lt;Quay lại
                </NavLink>
            </div>
        </div>
    );
};
export default SignUp;
