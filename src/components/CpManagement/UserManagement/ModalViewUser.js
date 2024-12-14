import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiServices";
import _ from "lodash";

function ModalViewUser(props) {
    // const FormData = require("form-data");
    const { show, setShow, dataView } = props;
    // console.log("dâtupdate",dataUpdate);
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setUserName("");
        setFullName("");
        setPassword("");
        setAddress("");
        setPhoneNumber("");
        setRole("CUSTOMER");
        setAvatar("");
        setPreviewImage("");
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [avatar, setAvatar] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email);
            setUserName(dataView.username);
            setFullName(dataView.fullName);// setPassword("");
            setAddress(dataView.address);
            setPhoneNumber(dataView.phone);
            setRole(dataView.role);
            setPreviewImage(`${dataView.avatar}`);
        }
    }, [dataView]);
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalAddUser">
                <Modal.Header closeButton>
                    <Modal.Title>Thốn tin tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="example@gmail.com" value={email} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="********"
                                value={password}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">UserName</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="NguyenA"
                                value={userName}
                                disabled
                            />

                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Tên đầy đủ</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nguyen Van Anh"
                                value={fullName}
                                disabled
                            />

                        </div>
                        <div className="col-12">
                            <label className="form-label">Địa chỉ</label>
                            <input type="text" className="form-control" placeholder="18 Hoàng Quốc VIệt, Cầu Giấy, Hà Nội" value={address} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Số điện thoại</label>
                            <input type="number" className="form-control" placeholder="0123 456 789" value={phoneNumber} disabled />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Vai trò</label>
                            <select className="form-select" disabled>
                                <option value="" selected>
                                    {dataView.role}
                                </option>
                            </select>
                        </div>
                        <div className="col-12  img-preview">{previewImage ? <img src={previewImage} alt="No avatar" /> : <span>Preview Image</span>}</div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;
