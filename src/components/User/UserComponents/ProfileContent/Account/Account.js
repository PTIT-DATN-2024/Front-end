import React from "react";
import "./Account.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useRef } from "react";
import { FcPlus } from "react-icons/fc";
import ListGroup from "react-bootstrap/ListGroup";
import { BsCartCheck } from "react-icons/bs";
import validateFields from "../../../../Golobal/validate";
import { putUpdateUser } from "../../../../../services/apiServices";
const Account = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.account.access_token);
    const account = useSelector((state) => state.user.account);
    const userCart = useSelector((state) => state.cart.cartItems);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    let navigate = useNavigate();


    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (!_.isEmpty(account)) {
            setUserName(account.id);
            setFullName(account.id);
            setAddress(account.id);
            setPhone(account.id);
            setPreviewImage(`${account.avatar}`);
        }
    }, []);
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setAvatar(event.target.files[0]);
        } else {
            // setPreviewImage("");
        }
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
    const handleSubmitUpdateUser = async (event) => {
        // validate
        const dataValidate = {
            useName: userName,
            fullName: fullName,
            address: address,
            phoneNumber: phone,
        };
        const newErrors = { ...errors, ...validateFields(dataValidate) };
        setErrors(newErrors);
        const allFieldsEmpty = Object.values(errors).every((value) => value === "");
        if (allFieldsEmpty) {
            // callapi
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`, // Đặt token vào header Authorization
                },
            };
            const formData = new FormData();
            formData.append("userName", userName);
            formData.append("fullName", fullName);
            formData.append("address", address);
            formData.append("phone", phone);
            formData.append("avatar", avatar);
            let res_data = await putUpdateUser(formData, config);
            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
            }
            if (res_data && res_data.EC !== 0) {
                toast.error(res_data.MS);
            }
        }
        else {
            toast.error("Thông tin nhập vào không chính xác");
        }
    };
    return (
        <>
            <div className="title-tk-2021">Thông tin tài khoản</div>
            <div className="box-cus-info-2021-ct" id="manhinhtaikhoan1">
                <div className="col-12  img-preview-info-profile"> <img src={account.avatar} alt="No avatar" /></div>
                <div className="col-3">
                    <label className="form-label label_input-file" htmlFor="inputFileUser">
                        <FcPlus />
                        Upload file image
                    </label>
                    <input type="file" className="form-control" hidden id="inputFileUser" onChange={(event) => handleUploadImage(event)} />
                </div>
                <div className="item-tk">
                    <label>Email</label>
                    <div className="item-tk-ct">
                        <input type="text" value={account.email} className="inputText" readOnly />
                        <div className="item-tk-ct-note"></div>
                    </div>
                </div>

                <div className="item-tk">
                    <label>UserName</label>
                    <div className="item-tk-ct">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="NguyenA"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            onBlur={() => handleBlur("userName", userName)}
                            onFocus={() => handleFocus("userName")}
                        />
                    </div>
                </div>
                {errors.userName && <div className="text-danger" style={{ marginLeft: "145px" }}>{errors.userName}</div>}
                <div className="item-tk">
                    <label>Họ tên</label>
                    <div className="item-tk-ct">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nguyen Van Anh"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                            onBlur={() => handleBlur("fullName", fullName)}
                            onFocus={() => handleFocus("fullName")}
                        />
                    </div>
                </div>
                {errors.fullName && <div className="text-danger" style={{ marginLeft: "145px" }}>{errors.fullName}</div>}
                <div className="item-tk">
                    <label>Số điện thoại</label>
                    <div className="item-tk-ct">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="0123 456 789"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            onBlur={() => handleBlur("phoneNumber", phone)}
                            onFocus={() => handleFocus("phoneNumber")}
                        />
                    </div>
                </div>

                {errors.phoneNumber && <div className="text-danger" style={{ marginLeft: "145px" }}>{errors.phoneNumber}</div>}
                <div className="item-tk">
                    <label>Địa chỉ</label>
                    <div className="item-tk-ct">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="18 Hoàng Quốc VIệt, Cầu Giấy, Hà Nội"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            onBlur={() => handleBlur("address", address)}
                            onFocus={() => handleFocus("address")}
                        />
                    </div>
                </div>
                {errors.address && <div className="text-danger">{errors.address}</div>}
                <div className="item-tk">
                    <label></label>
                    <div className="item-tk-ct">
                        <div  onClick={() => handleSubmitUpdateUser()} className="tk-btn-submit" style={{cursor:'pointer'}}>
                            Chỉnh sửa thông tin
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Account;
