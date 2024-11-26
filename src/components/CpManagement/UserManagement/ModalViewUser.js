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

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email);
            // setPassword("");
            setAddress(dataView.address);
            setPhoneNumber(dataView.phoneNumber);
            setRole(dataView.role);
            setPreviewImage(`${dataView.avatar}`);
        }
    }, [dataView]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setAvatar(event.target.files[0]);
        } else {
            // setPreviewImage("");
        }
    };
    const handleSubmitUpdateUser = async (event) => {
        // validate?
        // callapi
        let res_data = await putUpdateUser(dataView._id, address, phoneNumber, role, avatar);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            handleClose();
            await props.fetchListUsers();
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
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
                            <input type="email" className="form-control" placeholder="example@gmail.com" value={email} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone Number</label>
                            <input type="number" className="form-control" placeholder="0123 456 789" value={phoneNumber} disabled />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" placeholder="18 Hoàng Quốc VIệt, Cầu Giấy, Hà Nội" value={address} disabled />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" disabled>
                                <option value="" selected>
                                    {dataView.role}
                                </option>
                            </select>
                        </div>
                        <div className="col-12  img-preview">{previewImage ? <img src={previewImage} alt="" /> : <span>Preview Image</span>}</div>
                        <div className=" list_product">
                            <div className="">Payed Product</div>
                            <span>product 1</span>
                            <span>product 2</span>
                            <span>product 3</span>
                            <span>product 4</span>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;
