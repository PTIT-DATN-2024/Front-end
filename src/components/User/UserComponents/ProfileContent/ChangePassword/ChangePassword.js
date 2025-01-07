import React, { useState } from "react";
import "./ChangePassword.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Đảm bảo đã cài đặt react-toastify
import { changePassword } from "../../../../../services/apiServices"; // Giả định rằng bạn có hàm changePassword trong API service
import { useDispatch, useSelector } from "react-redux";
import validateFields from "../../../../Golobal/validate";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.user.account);
    const [email, setEmail] = useState("");
    let navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const token = "your-token-here"; // Token của bạn cần lấy từ state hoặc context

    const handleBlur = (field, value) => {
        const newErrors = { ...errors, ...validateFields({ [field]: value }) };
        setErrors(newErrors);
    };
    const handleLogOut = async () => {
        dispatch({
            type: "user_logout",
        });
        toast.success("Đăng xuất thành công");
        navigate("/");
    };
    const handleFocus = (field) => {
        const newErrors = { ...errors };
        newErrors[field] = "";
        setErrors(newErrors);
    };
    const handleSubmidChangePassword = async (event) => {


        const dataValidate = {
            password: newPassword,
            email: email,
            password: confirmPassword,
        };
        const newErrors = {
            ...errors,
            ...validateFields(dataValidate),
            ...(email !== account.email && { email: "Email không khớp." }),
            ...(newPassword !== confirmPassword && { password: "Mật khẩu xác nhận không khớp." }),
        };
        // const newErrors = { ...errors, ...validateFields(dataValidate) };
        setErrors(newErrors);

        const allFieldsEmpty = Object.values(newErrors).every((value) => value === "");
        if (allFieldsEmpty) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                };
                const data = {
                    password: newPassword
                }
                let res_data = await changePassword(account.id, data, config);

                if (res_data && res_data.EC === 0) {
                    toast.success(res_data.MS);
                    setEmail("");
                    setNewPassword("");
                    setConfirmPassword("");
                    handleLogOut()
                } else if (res_data && res_data.EC !== 0) {
                    toast.error(res_data.MS);
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi đổi mật khẩu.");
            }
        } else {
            toast.error("Thông tin nhập vào không chính xác");
        }
    };


    return (
        <>
            <div className="title-tk-2021">Thông tin tài khoản</div>
            <div className="box-cus-info-2021-ct" id="manhinhtaikhoan1">
                <div className="item-tk">
                    <label>Email</label>
                    <div className="item-tk-ct">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            onBlur={() => handleBlur("email", email)}
                            onFocus={() => handleFocus("email")}
                        />
                    </div>
                </div>
                {errors.email && <div className="text-danger" style={{ marginLeft: "145px" }}>{errors.email}</div>}
                <div className="item-tk">
                    <label>Mật khẩu</label>
                    <div className="item-tk-ct">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="********"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            onBlur={() => handleBlur("password", newPassword)}
                            onFocus={() => handleFocus("password")}
                        />
                    </div>
                </div>
                {errors.password && <div className="text-danger" style={{ marginLeft: "145px" }}>{errors.password}</div>}
                <div className="item-tk">
                    <label>Nhập lại mật khẩu</label>
                    <div className="item-tk-ct">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            onBlur={() => handleBlur("password", confirmPassword)}
                            onFocus={() => handleFocus("password")}
                        />
                    </div>
                </div>
                {errors.password && <div className="text-danger" style={{ marginLeft: "145px" }}>{errors.password}</div>}
                <div className="item-tk">
                    <label></label>
                    <div className="item-tk-ct">
                        <div onClick={() => handleSubmidChangePassword()} className="tk-btn-submit" style={{ cursor: 'pointer' }}>
                            Lưu
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
