import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateBgImage } from "../../../../services/apiServices";
import { useSelector } from "react-redux";
const ModalCreateBgImage = (props) => {
    const token = useSelector((state) => state.user.account.access_token);
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
        setName("");
        setImg("");
        setPreviewImage("");
    };
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImg(event.target.files[0]);
        } else {
            // setPreviewImage("");
        }
    };
    const handleSubmitCreateBgImage = async (event) => {
        // validate
        // callapi
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${token}`,
            },
        };
        const formData = new FormData();
        formData.append("name", name);
        formData.append("img", img);
        let res_data = await postCreateBgImage(formData, config);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            handleClose();
            await props.fetchListBgImages()
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalAddBgImage">
                <Modal.Header closeButton>
                    <Modal.Title>Add new BgImage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Đồ ăn nhanh" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>

                        <div className="col-3">
                            <label className="form-label label_input-file" htmlFor="inputFileBgImage">
                                <FcPlus />
                                Upload file image
                            </label>
                            <input type="file" className="form-control" hidden id="inputFileBgImage" onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className="col-12  img-preview">{previewImage ? <img src={previewImage} alt="" /> : <span>Preview Image</span>}</div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateBgImage()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalCreateBgImage;
