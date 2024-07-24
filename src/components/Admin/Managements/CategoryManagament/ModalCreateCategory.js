import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateCategory } from "../../../../services/apiServices";
import { useSelector } from "react-redux";
import validateFields from "../../../Golobal/validate";
const ModalCreateCategory = (props) => {
    const token = useSelector((state) => state.user.account.access_token);
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
        setName("");
        setAvatar("");
        setPreviewImage("");
        setErrors({});
    };
    useEffect(() => {
        handleBlur("categoryAvatar", avatar);
    }, []);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState();
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setAvatar(event.target.files[0]);
        } else {
            // setPreviewImage("");
        }
    };
    const handleBlur = (field, value) => {
        const newErrors = { ...errors, ...validateFields({ [field]: value }) };
        setErrors(newErrors);
    };

    const handleFocus = (field) => {
        const newErrors = { ...errors };
        newErrors[field] = "";
        setErrors(newErrors);
    };
    const handleSubmitCreateCategory = async (event) => {
        // validate
        const dataValidate = {
            categoryName: name,
            categoryAvatar: avatar,
        };
        const newErrors = { ...errors, ...validateFields(dataValidate) };
        setErrors(newErrors);
        const allFieldsEmpty = Object.values(errors).every((value) => value === "");
        if (allFieldsEmpty) {
            // callapi
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            };
            const formData = new FormData();
            formData.append("name", name);
            formData.append("avatar", avatar);
            let res_data = await postCreateCategory(formData, config);
            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
                handleClose();
                await props.fetchListCategories();
            }
            if (res_data && res_data.EC !== 0) {
                toast.error(res_data.MS);
            }
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
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Đồ ăn nhanh"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                onBlur={() => handleBlur("categoryName", name)}
                                onFocus={() => handleFocus("categoryName")}
                            />
                            {errors.categoryName && <div className="text-danger">{errors.categoryName}</div>}
                        </div>

                        <div className="col-3">
                            <label className="form-label label_input-file" htmlFor="inputFileCategory">
                                <FcPlus />
                                Upload file image
                            </label>
                            <input type="file" className="form-control" hidden id="inputFileCategory" onChange={(event) => handleUploadImage(event)} onBlur={() => handleBlur("categoryAvatar", avatar)} onFocus={() => handleFocus("categoryAvatar")} />
                            {errors.categoryAvatar && <div className="text-danger">{errors.categoryAvatar}</div>}
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
