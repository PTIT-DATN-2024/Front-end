import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateProduct, getAllProducts, putUpdateProduct, deleteProduct } from "../../../services/apiServices";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import validateFields from "../../Golobal/validate";
import _ from "lodash";
const ModalCreateProduct = (props) => {
    const token = useSelector((state) => state.user.account.access_token);
    const listCategories = useSelector((state) => state.category.listCategories);
    // const FormData = require("form-data");
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
        setName("");
        setCategory("");
        setImportPrice("");
        setSellingPrice("");
        setWeight("");
        setPresentImage("");
        setPresentImage1("");
        setPresentImage2("");
        setDescriptiom("");
        setCount("");
        setPreviewImage("");
        setPreviewImage1("");
        setPreviewImage2("");
        setErrors({});
    };
    //  name,
    // category
    //  importprice,
    //  sellingprice,
    //  weight,
    //  presentimage,
    //  description
    //  count
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [importPrice, setImportPrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [presentImage, setPresentImage] = useState();
    const [presentImage1, setPresentImage1] = useState();
    const [presentImage2, setPresentImage2] = useState();
    const [description, setDescriptiom] = useState("");
    const [count, setCount] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [previewImage1, setPreviewImage1] = useState("");
    const [previewImage2, setPreviewImage2] = useState("");
    const [errors, setErrors] = useState({});

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            const file = event.target.files[0];
            setPresentImage(file);
        } else {
            // setPreviewImage("");
        }
    };
    const handleUploadImage1 = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage1(URL.createObjectURL(event.target.files[0]));
            const file = event.target.files[0];
            setPresentImage1(file);
        } else {
            // setPreviewImage("");
        }
    };
    const handleUploadImage2 = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage2(URL.createObjectURL(event.target.files[0]));
            const file = event.target.files[0];
            setPresentImage2(file);
        } else {
            // setPreviewImage("");
        }
    };
    useEffect(() => {
        handleBlur("productPresent", presentImage);
        handleBlur("productPresent1", presentImage1);
        handleBlur("productPresent2", presentImage2);
    }, []);
    const handleBlur = (field, value) => {
        const newErrors = { ...errors, ...validateFields({ [field]: value }) };
        setErrors(newErrors);
    };

    const handleFocus = (field) => {
        const newErrors = { ...errors };
        newErrors[field] = "";
        setErrors(newErrors);
    };
    const handleSubmitCreateProduct = async (event) => {
        // validate
        const dataValidate = {
            productName: name,
            productCategory: category,
            importprice: importPrice,
            sellingprice: { sellingprice: sellingPrice, importprice: importPrice },
            weight: weight,
            productPresent: presentImage,
            productPresent1: presentImage1,
            productPresent2: presentImage2,
            productDescription: description,
            productCount: count,
        };
        const newErrors = { ...errors, ...validateFields(dataValidate) };
        setErrors(newErrors);
        const allFieldsEmpty = Object.values(errors).every((value) => value === "");
        console.log(allFieldsEmpty);
        if (allFieldsEmpty) {
            // callapi
            // console.log("qwedqw");
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            };
            const formData = new FormData();
            formData.append("name", name);
            formData.append("categoryId", category);
            formData.append("importPrice", importPrice);
            formData.append("sellingPrice", sellingPrice);
            formData.append("weight", weight);
            formData.append("avatar", presentImage);
            formData.append("avatar1", presentImage1);
            formData.append("avatar2", presentImage2);
            formData.append("description", description);
            formData.append("total", count);
            let res_data = await postCreateProduct(formData, config);
            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
                handleClose();
                await props.fetchListProducts();
            }
            if (res_data && res_data.EC !== 0) {
                toast.error(res_data.MS);
            }
        }
        // "MS": "Error while creating: Unable to find selling_electronic_devices.back_end.Entity.Product with id 2170897d-b563-4f67-a36f-e884c36a15dd",
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalAddProduct">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Tên</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Màn hình ASUS"
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
                                <select className="form-control form-select" onChange={(event) => setCategory(event.target.value)} onBlur={() => handleBlur("productCategory", category)} onFocus={() => handleFocus("productCategory")}>
                                    <option key={0} value=""></option>
                                    {listCategories.map((category, index) => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            }
                            {errors.productCategory && <div className="text-danger">{errors.productCategory}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giá nhập</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="50000"
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
                            <label className="form-label">Giá bán</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="80000"
                                value={sellingPrice}
                                onChange={(event) => setSellingPrice(event.target.value)}
                                onBlur={() => handleBlur("sellingprice", { sellingprice: sellingPrice, importprice: importPrice })}
                                onFocus={() => handleFocus("sellingprice")}
                            />
                            {errors.sellingprice && <div className="text-danger">{errors.sellingprice}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Khối lượng (g)</label>
                            <input type="text" className="form-control" placeholder="500" value={weight} onChange={(event) => setWeight(event.target.value)} onBlur={() => handleBlur("weight", weight)} onFocus={() => handleFocus("weight")} />
                            {errors.weight && <div className="text-danger">{errors.weight}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Số lượng </label>
                            <input type="text" className="form-control" placeholder="500" value={count} onChange={(event) => setCount(event.target.value)} onBlur={() => handleBlur("productCount", count)} onFocus={() => handleFocus("productCount")} />
                            {errors.productCount && <div className="text-danger">{errors.productCount}</div>}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Mô tả</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Example description"
                                value={description}
                                onChange={(event) => setDescriptiom(event.target.value)}
                                onBlur={() => handleBlur("productDescription", description)}
                                onFocus={() => handleFocus("productDescription")}
                            />
                            {errors.productDescription && <div className="text-danger">{errors.productDescription}</div>}
                        </div>
                        <div className="col-3">
                            <label className="form-label label_input-file" htmlFor="inputFileProduct">
                                <FcPlus />
                                Tải ảnh 1 lên
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
                        <div className="col-12  img-preview">{previewImage ? <img src={previewImage} alt="" /> : <span>Preview Image</span>}</div>
                        <div className="col-3">
                            <label className="form-label label_input-file" htmlFor="inputFileProduct1">
                                <FcPlus />
                                Tải ảnh 2 lên
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                hidden
                                id="inputFileProduct1"
                                onChange={(event) => handleUploadImage1(event)}
                                onBlur={() => handleBlur("productPresent1", presentImage1)}
                                onFocus={() => handleFocus("productPresent1")}
                            />
                            {errors.productPresent1 && <div className="text-danger">{errors.productPresent1}</div>}
                        </div>
                        <div className="col-12  img-preview">{previewImage1 ? <img src={previewImage1} alt="" /> : <span>Preview Image 2</span>}</div>
                        <div className="col-3">
                            <label className="form-label label_input-file" htmlFor="inputFileProduct2">
                                <FcPlus />
                                Tải ảnh 3 lên
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                hidden
                                id="inputFileProduct2"
                                onChange={(event) => handleUploadImage2(event)}
                                onBlur={() => handleBlur("productPresent2", presentImage2)}
                                onFocus={() => handleFocus("productPresent2")}
                            />
                            {errors.productPresent2 && <div className="text-danger">{errors.productPresent2}</div>}
                        </div>
                        <div className="col-12  img-preview">{previewImage2 ? <img src={previewImage2} alt="" /> : <span>Preview Image 3</span>}</div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateProduct()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalCreateProduct;
