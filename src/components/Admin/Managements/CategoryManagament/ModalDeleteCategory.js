import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateCategory, getAllCategories, putUpdateCategory, deleteCategory } from "../../../../services/apiServices";
import _ from "lodash";
import { useSelector } from "react-redux";
const ModalDeleteCategory = (props) => {
    const token = useSelector((state) => state.user.account.access_token);
    const { show, setShow, fetchListCategories, dataDelete } = props;
    
    // console.log(dataDelete);
    const handleClose = () => setShow(false);
    const handleSubmitDeleteCategory = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`, // Đặt token vào header Authorization
            },
        };
        let res_data = await deleteCategory(dataDelete._id,config);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            handleClose();
            await props.fetchListCategories();
        }
        if (res_data && res_data.EC === 1) {
            toast.warning(res_data.MS);
            handleClose();
            await props.fetchListCategories();
        }
        if (res_data && res_data.EC === 2) {
            toast.error(res_data.MS);
            handleClose();
            await props.fetchListCategories();
        }
        if (res_data && res_data.EC === 3) {
            toast.error(res_data.MS);
            handleClose();
            await props.fetchListCategories();
        }

    };
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete category ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete this category:
                    <b> {dataDelete && dataDelete.name ? dataDelete.name : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteCategory}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteCategory;
