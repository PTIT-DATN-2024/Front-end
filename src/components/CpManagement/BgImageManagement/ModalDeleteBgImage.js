import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteBgImage } from "../../../services/apiServices";
import _ from "lodash";
import { useSelector } from "react-redux";
const ModalDeleteBgImage = (props) => {
    const token = useSelector((state) => state.user.account.access_token);
    const { show, setShow, fetchListBgImages, dataDelete } = props;
    
    // console.log(dataDelete);
    const handleClose = () => setShow(false);
    const handleSubmitDeleteBgImage = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`, 
            },
        };
        let res_data = await deleteBgImage(dataDelete._id,config);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            handleClose();
            await props.fetchListBgImages();
        }
        if (res_data && res_data.EC !==0 ) {
            toast.error(res_data.MS);
            handleClose();
            await props.fetchListBgImages();
        }


    };
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete BgImage ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete this BgImage:
                    <b> {dataDelete && dataDelete.name ? dataDelete.name : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteBgImage}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteBgImage;
