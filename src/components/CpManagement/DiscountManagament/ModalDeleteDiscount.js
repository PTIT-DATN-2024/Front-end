import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteDiscount } from "../../../services/apiServices";
import _ from "lodash";
import { useSelector } from "react-redux";
const ModalDeleteDiscount = (props) => {
    const token = useSelector((state) => state.user.account.access_token);
    const { show, setShow, fetchListDiscount, dataDelete } = props;

    // console.log(dataDelete);
    const handleClose = () => setShow(false);
    const handleSubmitDeleteDiscount = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        };
        let res_data = await deleteDiscount(dataDelete.productDiscountId, config);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            handleClose();
            await props.fetchListDiscounts();
        }
        else {
            toast.warning(res_data.MS);
            handleClose();
            await props.fetchListDiscounts();
        }

    };
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa giảm giá </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa giảm giá:
                    <b> {dataDelete && dataDelete.name ? dataDelete.name : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteDiscount}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteDiscount;
