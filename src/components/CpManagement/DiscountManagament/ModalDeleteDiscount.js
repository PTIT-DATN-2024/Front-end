import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteCategory } from "../../../services/apiServices";
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
                authorization: `Bearer ${token}`, 
            },
        };
        let res_data = await deleteCategory(dataDelete.categoryId,config);
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
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa danh mục </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa danh mục: 
                    <b> {dataDelete && dataDelete.name ? dataDelete.name : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteCategory}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteCategory;
