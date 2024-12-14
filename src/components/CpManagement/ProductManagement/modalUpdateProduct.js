import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateProduct } from "../../../services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import validateFields from "../../Golobal/validate";
const ModalUpdateProduct = (props) => {
    const token = useSelector((state) => state.user.account.access_token);
    const listCategories = useSelector((state) => state.category.listCategories);
    // const FormData = require("form-data");
    const { show, setShow, dataUpdate } = props;
    const handleClose = () => {
        setShow(false);
        setErrors({});
        // setName("");
        // setCategory("");
        // setImportPrice("");
        // setSellingPrice("");
        // setWeight("");
        // setPresentImage("");
        // setDescriptiom("");
        // setCount("");
        // setPreviewImage("");
    };
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [importPrice, setImportPrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [rate, setRate] = useState("");
    const [numberVote, setNumberVote] = useState("");
    const [productDiscount, setProductDiscount] = useState("0");
    const [status, setStatus] = useState("");
    const [weight, setWeight] = useState("");
    const [presentImage, setPresentImage] = useState("");
    const [description, setDescription] = useState("");
    const [total, setTotal] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setCategory(dataUpdate.category.categoryId);
            setImportPrice(dataUpdate.importPrice);
            setSellingPrice(dataUpdate.sellingPrice);
            setWeight(dataUpdate.weight);
            setPresentImage(`${dataUpdate.productImages[0].image}`);
            setDescription(dataUpdate.description);
            setTotal(dataUpdate.total);
            setPreviewImage(`${dataUpdate.productImages[0].image}`);
            setRate(dataUpdate.rate);
            setNumberVote(dataUpdate.numberVote);
            setStatus(dataUpdate.status);
            setProductDiscount(dataUpdate.productDiscount);
        }
    }, [dataUpdate]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setPresentImage(event.target.files[0]);
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
    const handleSubmitUpdateProduct = async (event) => {
        // validate
        const dataValidate = {
            productName: name,
            productCategory: category,
            importprice: importPrice,
            sellingprice: { sellingprice: sellingPrice, importprice: importPrice },
            weight: weight,
            productPresent: presentImage,
            productDescription: description,
            productCount: total,
        };
        const newErrors = { ...errors, ...validateFields(dataValidate) };
        setErrors(newErrors);
        const allFieldsEmpty = Object.values(errors).every((value) => value === "");
        // callapi
        if (allFieldsEmpty) {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            };
            const formData = new FormData();
            formData.append("name", name);
            formData.append("weight", weight);
            formData.append("importPrice", importPrice);
            formData.append("sellingPrice", sellingPrice);
            formData.append("description", description);
            formData.append("total", total);
            formData.append("category", category);
            formData.append("presentImage", presentImage);
            let res_data = await putUpdateProduct(dataUpdate._id, formData, config);
            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
                handleClose();
                await props.fetchListProducts();
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
                    <Modal.Title>Chỉnh sửa thông tin: {dataUpdate && dataUpdate.name ? dataUpdate.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Tên</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Màn hình ABC"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                onBlur={() => handleBlur("productName", name)}
                                onFocus={() => handleFocus("productName")}
                            />
                            {errors.productName && <div className="text-danger">{errors.productName}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Danh mục</label>
                            {
                                <select
                                    className="form-control form-select"
                                    onChange={(event) => setCategory(event.target.value)}
                                    placeholder={!_.isEmpty(dataUpdate) ? dataUpdate.category.nameCategory : ""}
                                    onBlur={() => handleBlur("productCategory", category)}
                                    onFocus={() => handleFocus("productCategory")}
                                >
                                    <option key={0} value=""></option>
                                    {listCategories.map((category) => {
                                        return (
                                            <option key={category.categoryId} value={category.categoryId} selected={!_.isEmpty(dataUpdate) ? category.name === dataUpdate.category.name : false}>
                                                {category.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            }
                            {errors.productCategory && <div className="text-danger">{errors.productCategory}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giá nhập (VND)</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Example"
                                value={importPrice}
                                onChange={(event) => setImportPrice(event.target.value)}
                                onBlur={() => {
                                    handleBlur("sellingprice", { sellingprice: sellingPrice, importprice: importPrice });
                                    handleBlur("importprice", importPrice);
                                }}
                                onFocus={() => {
                                    handleFocus("sellingprice");
                                    handleFocus("importprice");
                                }}
                            />
                            {errors.importprice && <div className="text-danger">{errors.importprice}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giá bán (VND)</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Example"
                                value={sellingPrice}
                                onChange={(event) => setSellingPrice(event.target.value)}
                                onBlur={() => handleBlur("sellingprice", { sellingprice: sellingPrice, importprice: importPrice })}
                                onFocus={() => handleFocus("sellingprice")}
                            />
                            {errors.sellingprice && <div className="text-danger">{errors.sellingprice}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Trọng lượng</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Example"
                                value={weight}
                                onChange={(event) => setWeight(event.target.value)}
                                onBlur={() => handleBlur("weight", weight)}
                                onFocus={() => handleFocus("weight")}
                            />
                            {errors.weight && <div className="text-danger">{errors.weight}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Số lượng</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Example"
                                value={total}
                                onChange={(event) => setTotal(event.target.value)}
                                onBlur={() => handleBlur("productCount", total)}
                                onFocus={() => handleFocus("productCount")}
                            />
                            {errors.productCount && <div className="text-danger">{errors.productCount}</div>}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Mô tả</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Example description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                onBlur={() => handleBlur("productDescription", description)}
                                onFocus={() => handleFocus("productDescription")}
                            />
                            {errors.productDescription && <div className="text-danger">{errors.productDescription}</div>}
                        </div>
                        <div className="col-3">
                            <label className="form-label label_input-file" htmlFor="inputFileProduct">
                                <FcPlus />
                                Tải ảnh lên
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                hidden
                                id="inputFileProduct"
                                onChange={(event) => handleUploadImage(event)}
                                onBlur={() => handleBlur("productPresent", presentImage)}
                                onFocus={() => handleFocus("productPresent")}
                            />
                            {errors.productPresent && <div className="text-danger">{errors.productPresent}</div>}
                        </div>
                        <div className="col-12  img-preview">
                            <img src={previewImage} alt="preview image" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateProduct()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUpdateProduct;
