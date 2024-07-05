import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateCategory,getAllCategories,putUpdateCategory,deleteCategory } from "../../../../services/apiServices";


const ModalCreateCategory = (props) => {
    // const FormData = require("form-data");
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
        setName("");
        setAvatar("");
        setPreviewImage("");
    };
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setAvatar(event.target.files[0]);
        } else {
            // setPreviewImage("");
        }
    };
    const handleSubmitCreateCategory = async (event) => {
        // validate?
        // callapi
        let res_data = await postCreateCategory(name, avatar);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            handleClose();
            await props.fetchListCategories()
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalAddCategory">
                <Modal.Header closeButton>
                    <Modal.Title>Add new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Đồ ăn nhanh" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>

                        <div className="col-3">
                            <label className="form-label label_input-file" htmlFor="inputFileCategory">
                                <FcPlus />
                                Upload file image
                            </label>
                            <input type="file" className="form-control" hidden id="inputFileCategory" onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className="col-12  img-preview">{previewImage ? <img src={previewImage} alt="" /> : <span>Preview Image</span>}</div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateCategory()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalCreateCategory;
