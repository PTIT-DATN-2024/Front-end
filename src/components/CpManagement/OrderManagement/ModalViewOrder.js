import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { putEditStatusOrder } from "../../../services/apiServices";
import _ from "lodash";

const ModalViewOrder = (props) => {
    const { show, setShow, dataView, fetchListOrders } = props;
    const [userEmail, setUserEmail] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [previewAvatar, setPreviewAvatar] = useState("");
    const [listItem, setListItem] = useState([]);
    const [total, setTotal] = useState(0);
    const [statusOrder, setStatusOrder] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setUserEmail(dataView.customer.email || "");
            setUserAvatar(dataView.customer.avatar || "");
            setPreviewAvatar(dataView.customer.avatar || "");
            setListItem(dataView.detailOrderedProducts || []);
            setTotal(dataView.total || 0);
            setStatusOrder(dataView.status || "");
        }
    }, [dataView]);
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
                    <div key={item.detailOrderProductId} style={{ marginBottom: "10px" }}>
                        <Form.Group controlId={`productName${index}`}>
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                value={item.product.name}
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
                        <Form.Text>Thành tiền: {item.totalPrice.toLocaleString()} VND</Form.Text>
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
                        />
                        <Form.Check
                            type="radio"
                            id="CLH"
                            label="Chờ lấy hàng"
                            checked={statusOrder === "CLH"}
                        />
                        <Form.Check
                            type="radio"
                            id="DG"
                            label="Đang giao"
                            checked={statusOrder === "DG"}
                        />
                        <Form.Check
                            type="radio"
                            id="DH"
                            label="Đã hủy"
                            checked={statusOrder === "DH"}
                        />
                        <Form.Check
                            type="radio"
                            id="HT"
                            label="Hoàn thành"
                            checked={statusOrder === "HT"}
                        />
                    </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalViewOrder;
