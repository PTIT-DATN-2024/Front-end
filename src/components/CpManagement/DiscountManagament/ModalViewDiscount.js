import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
function ModalViewDiscount(props) {
    const { show, setShow, dataView } = props;

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");
    const [expiredDate, setExpiredDate] = useState("");
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setName(dataView.name);
            setDiscountAmount(dataView.discountAmount);
            setExpiredDate(dataView.expiredDate);
        }
    }, [dataView]);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin giảm giá: {dataView && dataView.name ? dataView.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Tên</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tết nguyên đán"
                                value={name}
                                disabled
                            />

                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Số lượng giảm giá (%)</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="60%"
                                value={discountAmount}
                                disabled
                            />

                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Thời gian ( ngày)</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Moo tar"
                                value={expiredDate}
                                disabled
                            />

                        </div>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewDiscount;
