import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateUser } from "../../../services/apiServices";
import { useSelector } from "react-redux";
import validateFields from "../../Golobal/validate";
import _ from "lodash";
const ModalCreateUser = (props) => {
    const token = useSelector((state) => state.user.account.access_token);
    // const FormData = require("form-data");
    const { show, setShow } = props;
    // "email": "test132@example.com",
    // "password": "111111",
    // "userName": "111111",
    // "fullName": "User Twelve111",
    // "address": "ha noi",
    // "role": "ADMIN",
    // "avatar": "",
    // "phone": "1234568801"
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setUsername("");
        setFullName("");
        setPassword("");
        setAddress("");
        setPhoneNumber("");
        setRole("CUSTOMER");
        setAvatar("");
        setPreviewImage("");
        setErrors({});
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("CUSTOMER");
    const [avatar, setAvatar] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            const file = event.target.files[0];
            setAvatar(file);
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

    const handleSubmitCreateUser = async (event) => {
        // validate
        const dataValidate = {
            email: email,
            password: password,
            usename: username,
            fullName : fullName,
            address: address,
            phoneNumber: phoneNumber,
            role: role,
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
            formData.append("email", email);
            formData.append("password", password);
            formData.append("username", username);
            formData.append("fullName", fullName);
            formData.append("address", address);
            formData.append("phone", phoneNumber);
            formData.append("role", role);
            formData.append("avatar", avatar);
            let res_data = await postCreateUser(formData, config);
            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
                handleClose();
                await props.fetchListUsers();
            }
            if (res_data && res_data.EC !== 0) {
                toast.error(res_data.MS);
            }
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalAddUser">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                onBlur={() => handleBlur("email", email)}
                                onFocus={() => handleFocus("email")}
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="********"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onBlur={() => handleBlur("password", password)}
                                onFocus={() => handleFocus("password")}
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="NguyenA"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                onBlur={() => handleBlur("username", username)}
                                onFocus={() => handleFocus("username")}
                            />
                            {errors.username && <div className="text-danger">{errors.username}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Tên đầy đủ</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nguyen Van Anh"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                                onBlur={() => handleBlur("fullName", fullName)}
                                onFocus={() => handleFocus("fullName")}
                            />
                            {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
                        </div>
                        <div className="col-12">
                            <label className="form-label">Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="18 Hoàng Quốc VIệt, Cầu Giấy, Hà Nội"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                onBlur={() => handleBlur("address", address)}
                                onFocus={() => handleFocus("address")}
                            />
                            {errors.address && <div className="text-danger">{errors.address}</div>}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Số điện thoại</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="0123 456 789"
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                onBlur={() => handleBlur("phoneNumber", phoneNumber)}
                                onFocus={() => handleFocus("phoneNumber")}
                            />
                            {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Vai trò</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)} onBlur={() => handleBlur("role", role)} onFocus={() => handleFocus("role")}>
                                <option value="CUSTOMER">Khách hàng</option>
                                <option value="STAFF">Nhân viên</option>
                                <option value="ADMIN">Quản lí</option>
                            </select>
                            {errors.role && <div className="text-danger">{errors.role}</div>}
                        </div>
                        <div className="col-3">
                            <label className="form-label label_input-file" htmlFor="inputFileUser">
                                <FcPlus />
                                Tải ảnh lên
                            </label>
                            <input type="file" className="form-control" hidden id="inputFileUser" onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className="col-12  img-preview">{previewImage ? <img src={previewImage} alt="" /> : <span>Preview Image</span>}</div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalCreateUser;
