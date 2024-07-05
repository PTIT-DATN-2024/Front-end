import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { deleteUser } from "../../../../services/apiServices";
import _ from "lodash";

const ModalDeleteUser = (props) => {
    const { show, setShow, fetchListUsers,dataDelete } = props;
    // console.log(dataDelete);
    const handleClose = () => setShow(false);
    const handleSubmitDeleteUSer = async () => {
        let res_data = await deleteUser(dataDelete._id);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            handleClose();
            await props.fetchListUsers();
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete user ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete this user:
                    <b> {dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteUSer}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteUser;
