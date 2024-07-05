import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateCategory, getAllCategories, putUpdateCategory, deleteCategory } from "../../../../services/apiServices";
import _ from "lodash";

const ModalDeleteCategory = (props) => {
    const { show, setShow, fetchListCategories, dataDelete } = props;
    // console.log(dataDelete);
    const handleClose = () => setShow(false);
    const handleSubmitDeleteCategory = async () => {
        let res_data = await deleteCategory(dataDelete._id);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            handleClose();
            await props.fetchListCategories();
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
