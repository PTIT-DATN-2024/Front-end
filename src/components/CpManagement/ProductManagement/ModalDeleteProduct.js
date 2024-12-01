import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteProduct } from "../../../services/apiServices";
import _ from "lodash";
import { useSelector } from "react-redux";
const ModalDeleteProduct = (props) => {
    const token = useSelector((state) => state.user.account.access_token);
    const { show, setShow, dataDelete } = props;
    // console.log(dataDelete);
    const handleClose = () => setShow(false);
    const handleSubmitDeleteProduct = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`, // Đặt token vào header Authorization
            },
        };
        let res_data = await deleteProduct(dataDelete.productId, config);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            handleClose();
            await props.fetchListProducts();
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa sản phẩm ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa sản phẩm:
                    <b> {dataDelete && dataDelete.name ? dataDelete.name : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteProduct}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteProduct;
