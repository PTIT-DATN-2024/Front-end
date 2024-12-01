import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateCategory } from "../../../services/apiServices";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import validateFields from "../../Golobal/validate";
const ModalUpdateCategory = (props) => {
    const token = useSelector((state) => state.user.account.access_token);

    const { show, setShow, dataUpdate } = props;
    const handleClose = () => {
        setShow(false);
        setName("");
        setDesc("");
        setAvatar();
        setPreviewImage("");
        setErrors({});
    };
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [avatar, setAvatar] = useState();
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setDesc(dataUpdate.description);
            if (dataUpdate.avatar) {
                // setAvatar(dataUpdate.avatar);
                setPreviewImage(dataUpdate.avatar);
            }
        }
    }, [dataUpdate]);

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
    const handleSubmitUpdateCategory = async (event) => {
        // validate
        const dataValidate = {
            categoryName: name,
            description: desc,
            // categoryAvatar: avatar,
        };
        // "categoryId": "cate011",
        // "name": "Clothing",
        // "description": "Description of category 11",
        // "products": [],
        // "avatar": "1728958738001.jpg",
        // "createdAt": "2024-11-08T10:19:49.851705"
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
            formData.append("description", desc);
            if (avatar) {
                formData.append("avatar", avatar);
            }
            let res_data = await putUpdateCategory(dataUpdate.categoryId, formData, config);
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
    // console.log(props.dataUpdate);
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalUpdateCategory">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin : {dataUpdate && dataUpdate.name ? dataUpdate.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Tên danh mục: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Category example"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                onBlur={() => handleBlur("categoryName", name)}
                                onFocus={() => handleFocus("categoryName")}
                            />
                            {errors.categoryName && <div className="text-danger">{errors.categoryName}</div>}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Mô tả</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Moo tar"
                                value={desc}
                                onChange={(event) => setDesc(event.target.value)}
                                onBlur={() => handleBlur("description", desc)}
                                onFocus={() => handleFocus("description")}
                            />
                            {errors.description && <div className="text-danger">{errors.description}</div>}
                        </div>
                        <div className="col-3">
                            <label className="form-label label_input-file" htmlFor="inputFileCategory">
                                <FcPlus />
                                Tải ảnh lên
                            </label>
                            <input type="file" className="form-control" hidden id="inputFileCategory" onChange={(event) => handleUploadImage(event)} onBlur={() => handleBlur("categoryAvatar", avatar)} onFocus={() => handleFocus("categoryAvatar")} />
                            {errors.categoryAvatar && <div className="text-danger">{errors.categoryAvatar}</div>}
                        </div>
                        <div className="col-12  img-preview">{previewImage ? <img src={previewImage} alt="" /> : <span>Preview Image</span>}</div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateCategory()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUpdateCategory;
