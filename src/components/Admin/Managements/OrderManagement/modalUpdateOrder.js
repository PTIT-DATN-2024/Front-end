import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import {  putUpdateOrder } from "../../../../services/apiServices";
import _ from "lodash";
const ModalUpdateOrder = (props) => {
    const { show, setShow, dataUpdate } = props;
    // console.log("dâtupdate",dataUpdate);
    const handleClose = () => {
        setShow(false);
        setName("");
        setAvatar("");
        setPreviewImage("");
    };
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            // setPassword("");
            if (dataUpdate.avatar) {
                // setPreviewImage(`data:image/jpeg;base64,${dataUpdate.avatar}`);

            }
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
    const handleSubmitUpdateCategory = async (event) => {
        // validate
        // callapi
        let res_data = await putUpdateOrder(dataUpdate._id, name, avatar);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            handleClose();
            await props.fetchListOrders();
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalUpdateOrder">
                <div>123123</div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateCategory()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUpdateOrder;
