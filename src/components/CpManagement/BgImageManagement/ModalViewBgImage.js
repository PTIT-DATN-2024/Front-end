import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
function ModalViewBgImage(props) {
    const { show, setShow, dataView } = props;

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setName(dataView.name);

            setImg(dataView.img);

            setPreviewImage(`${dataView.img}`);
        }
    }, [dataView]);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Information of BgImage: {dataView && dataView.name ? dataView.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {" "}
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={name} disabled />
                        </div>
                        <div className="col-12  img-preview">
                            <img src={previewImage} alt="preview image" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewBgImage;
