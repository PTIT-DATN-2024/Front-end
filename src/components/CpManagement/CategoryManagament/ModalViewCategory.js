import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
function ModalViewCategory(props) {
    const { show, setShow, dataView } = props;

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setName(dataView.name);

            setAvatar(dataView.avatar);

            setPreviewImage(`${dataView.avatar}`);
        }
    }, [dataView]);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin danh mục: {dataView && dataView.name ? dataView.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {" "}
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Tên</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={name} disabled />
                        </div>
                        <div className="col-12  img-preview">
                            <img src={previewImage} alt="preview image" />
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

export default ModalViewCategory;
