import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteOrder } from "../../../services/apiServices";
import _ from "lodash";

const ModalDeleteOrder= (props) => {
    const { show, setShow, fetchListOrders, dataDelete } = props;
    const handleClose = () => setShow(false);
    const handleSubmitDeleteOrder = async () => {
        let res_data = await deleteOrder(dataDelete.orderId);
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
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa đơn hàng ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa đơn hàng:
                    <b> {dataDelete && dataDelete.orderId ? dataDelete.orderId : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteOrder}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteOrder;
