import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser, deleteStaff } from "../../../services/apiServices";
import _ from "lodash";
import { useSelector } from "react-redux";
const ModalDeleteUser = (props) => {
    const token = useSelector((state) => state.user.account.access_token);
    const { show, setShow,  dataDelete } = props;
    // console.log(dataDelete);
    const handleClose = () => setShow(false);
    const handleSubmitDeleteUSer = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        };
        if (dataDelete.role==="CUSTOMER"){
            let res_data = await deleteUser( dataDelete.customerId,config);
            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
                handleClose();
                await props.fetchListUsers();
            }
            if (res_data && res_data.EC !== 0) {
                toast.error(res_data.MS);
            }
        }
        else{
            let res_data = await deleteStaff( dataDelete.staffId,config);
            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
                handleClose();
                await props.fetchListUsers();
            }
            if (res_data && res_data.EC !== 0) {
                toast.error(res_data.MS);
            }
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa tài khoản ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa tài khoản:
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
