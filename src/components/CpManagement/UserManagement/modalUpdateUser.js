import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiServices";
import _ from "lodash";
import validateFields from "../../Golobal/validate";
import { useSelector } from "react-redux";
const ModalUpdateUser = (props) => {
    const token = useSelector((state) => state.user.account.access_token);

    // const FormData = require("form-data");
    const { show, setShow, dataUpdate } = props;
    const id = (dataUpdate.role === 'ADMIN') ? dataUpdate.adminId :
        (dataUpdate.role === 'STAFF') ? dataUpdate.staffId :
            (dataUpdate.role === 'CUSTOMER') ? dataUpdate.customerId :
                null;  // or you can handle the default case here if needed

    // console.log("dâtupdate",dataUpdate);
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setUsername("");
        setFullName("");
        setPassword("");
        setAddress("");
        setPhoneNumber("");
        setRole("");
        setAvatar("");
        setPreviewImage("");
        setErrors({});
        // setEmail("");
        // setPassword("");
        // setAddress("");
        // setPhoneNumber("");
        // setRole("USER");
        // setAvatar("");
        // setPreviewImage("");
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [avatar, setAvatar] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setPassword(dataUpdate.password);
            setUsername(dataUpdate.username);
            setFullName(dataUpdate.fullName);
            setAddress(dataUpdate.address);
            setPhoneNumber(dataUpdate.phone);
            setRole(dataUpdate.role);
            setPreviewImage(`${dataUpdate.avatar}`);
            setAvatar("no_change")
        }
    }, [dataUpdate]);

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
            email: email,
            username: username,
            fullName: fullName,
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
            formData.append("username", username);
            formData.append("fullName", fullName);
            formData.append("address", address);
            formData.append("phone", phoneNumber);
            formData.append("password", password);
            formData.append("role", role);
            if (avatar !== "no_change") {
                formData.append("avatar", avatar);
            }
            let res_data = await putUpdateUser(id, formData, config);
            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
                handleClose();
                await props.fetchListUsers();
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
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalAddUser">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="example@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mật khẩu</label>
                            <input type="password" className="form-control" placeholder="********" value="********" onChange={(event) => setPassword(event.target.value)} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">UserName</label>
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
                                <option value="CUSTOMER" selected={"CUSTOMER" === dataUpdate.role}>
                                    CUSTOMER
                                </option>
                                <option value="STAFF" selected={"STAFF" === dataUpdate.role}>
                                    STAFF
                                </option>
                                <option value="ADMIN" selected={"ADMIN" === dataUpdate.role}>
                                    ADMIN
                                </option>
                            </select>
                            {errors.role && <div className="text-danger">{errors.role}</div>}
                        </div>
                        <div className="col-3">
                            <label className="form-label label_input-file" htmlFor="inputFileUser">
                                <FcPlus />
                                Upload file image
                            </label>
                            <input type="file" className="form-control" hidden id="inputFileUser" onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className="col-12  img-preview">{previewImage ? <img src={previewImage} alt="" className="user-avatar" /> : <span>Preview Image</span>}</div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUpdateUser;
