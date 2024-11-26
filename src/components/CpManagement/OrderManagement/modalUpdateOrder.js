import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { putEditStatusOrder } from "../../../services/apiServices";
import _ from "lodash";

const ModalUpdateOrder = (props) => {
    const { show, setShow, dataUpdate, fetchListOrders } = props;
    const [userEmail, setUserEmail] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [previewAvatar, setPreviewAvatar] = useState("");
    const [listItem, setListItem] = useState([]);
    const [total, setTotal] = useState(0);
    const [statusOrder, setStatusOrder] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setUserEmail(dataUpdate.user.emailUser || "");
            setUserAvatar(dataUpdate.user.avatarUser || "");
            setPreviewAvatar(dataUpdate.user.avatarUser || "");
            setListItem(dataUpdate.listItem || []);
            setTotal(dataUpdate.total || 0);
            setStatusOrder(dataUpdate.statusOrder || "");
        }
    }, [dataUpdate]);

    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const resetForm = () => {
        setUserEmail("");
        setUserAvatar("");
        setPreviewAvatar("");
        setListItem([]);
        setTotal(0);
        setStatusOrder("");
    };




    const handleSave = async () => {
        const response = await putEditStatusOrder(dataUpdate._id, statusOrder);
        if (response && response.EC === 0) {
            toast.success(response.MS);
            handleClose();
            await fetchListOrders();
        } else if (response) {
            toast.error(response.MS);
        }
    };


    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="userEmail">
                    <Form.Label>Email khách hàng</Form.Label>
                    <Form.Control
                        type="text"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        disabled
                    />
                </Form.Group>
                <h5>Danh sách sản phẩm</h5>
                {listItem.map((item, index) => (
                    <div key={item.idProduct} style={{ marginBottom: "10px" }}>
                        <Form.Group controlId={`productName${index}`}>
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                value={item.nameProduct}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group controlId={`productQuantity${index}`}>
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control
                                type="number"
                                value={item.quantity}
                                disabled
                            />
                        </Form.Group>
                        <Form.Text>Thành tiền: {item.sum.toLocaleString()} VND</Form.Text>
                    </div>
                ))}

                <Form.Group controlId="total">
                    <Form.Label>Tổng tiền</Form.Label>
                    <Form.Control type="text" value={total.toLocaleString()} disabled />
                </Form.Group>

                <Form.Group controlId="statusOrder">
                    <Form.Label>Trạng thái đơn hàng</Form.Label>
                    <div>
                        <Form.Check
                            type="radio"
                            id="CXN"
                            label="Chờ xác nhận"
                            checked={statusOrder === "CXN"}
                            onChange={() => setStatusOrder("CXN")}
                        />
                        <Form.Check
                            type="radio"
                            id="CLH"
                            label="Chờ lấy hàng"
                            checked={statusOrder === "CLH"}
                            onChange={() => setStatusOrder("CLH")}
                        />
                        <Form.Check
                            type="radio"
                            id="DG"
                            label="Đang giao"
                            checked={statusOrder === "DG"}
                            onChange={() => setStatusOrder("DG")}
                        />
                        <Form.Check
                            type="radio"
                            id="DH"
                            label="Đã hủy"
                            checked={statusOrder === "DH"}
                            onChange={() => setStatusOrder("DH")}
                        />
                        <Form.Check
                            type="radio"
                            id="HT"
                            label="Hoàn thành"
                            checked={statusOrder === "HT"}
                            onChange={() => setStatusOrder("HT")}
                        />
                    </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Lưu thay đổi
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUpdateOrder;
