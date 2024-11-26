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
    // console.log("dâtupdate",dataUpdate);
    const handleClose = () => {
        setShow(false);
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
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [avatar, setAvatar] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            // setPassword("");
            setAddress(dataUpdate.address);
            setPhoneNumber(dataUpdate.phoneNumber);
            setRole(dataUpdate.role);
            setPreviewImage(`${dataUpdate.avatar}`);
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
        // validate?
        const dataValidate = {
            address: address,
            phoneNumber: phoneNumber,
            role: role,
        };
        const newErrors = { ...errors, ...validateFields(dataValidate) };
        setErrors(newErrors);
        const allFieldsEmpty = Object.values(errors).every((value) => value === "");
        // callapi
        if (allFieldsEmpty) {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`, // Đặt token vào header Authorization
                },
            };

            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("address", address);
            formData.append("phoneNumber", phoneNumber);
            formData.append("role", role);
            formData.append("avatar", avatar);

            let res_data = await putUpdateUser(dataUpdate._id, formData, config);
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
    // console.log(props.dataUpdate);
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalAddUser">
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="example@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="********" value={password} onChange={(event) => setPassword(event.target.value)} disabled />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Address</label>
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
                            <label className="form-label">Phone Number</label>
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
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)} onBlur={() => handleBlur("role", role)} onFocus={() => handleFocus("role")}>
                                <option value="USER" selected={"USER" === dataUpdate.role}>
                                    USER
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
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUpdateUser;
