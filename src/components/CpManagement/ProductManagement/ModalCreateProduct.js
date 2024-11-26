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
        setImportprice("");
        setSellingprice("");
        setWeight("");
        setPresentImage("");
        setDescriptiom("");
        setCount("");
        setPreviewImage("");
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
    const [importprice, setImportprice] = useState("");
    const [sellingprice, setSellingprice] = useState("");
    const [weight, setWeight] = useState("");
    const [presentImage, setPresentImage] = useState();
    const [description, setDescriptiom] = useState("");
    const [count, setCount] = useState("");
    const [previewImage, setPreviewImage] = useState("");
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
    useEffect(() => {
        handleBlur("productPresent", presentImage);
    },[]);
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
            importprice: importprice,
            sellingprice: { sellingprice: sellingprice, importprice: importprice },
            weight: weight,
            productPresent: presentImage,
            productDescription: description,
            productCount: count,
        };
        const newErrors = { ...errors, ...validateFields(dataValidate) };
        console.log("123123", newErrors);
        setErrors(newErrors);
        const allFieldsEmpty = Object.values(errors).every((value) => value === "");
        console.log(allFieldsEmpty);
        if (allFieldsEmpty) {
            // callapi
            console.log("qwedqw");
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            };
            const formData = new FormData();
            formData.append("name", name);
            formData.append("weight", weight);
            formData.append("importprice", importprice);
            formData.append("sellingprice", sellingprice);
            formData.append("description", description);
            formData.append("count", count);
            formData.append("category", category);
            formData.append("presentImage", presentImage);

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
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalAddProduct">
                <Modal.Header closeButton>
                    <Modal.Title>Add new Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Gà lắc phô mai"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                onBlur={() => handleBlur("productName", name)}
                                onFocus={() => handleFocus("productName")}
                            />
                            {errors.productName && <div className="text-danger">{errors.productName}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            {
                                <select className="form-control form-select" onChange={(event) => setCategory(event.target.value)} onBlur={() => handleBlur("productCategory", category)} onFocus={() => handleFocus("productCategory")}>
                                    <option key={0} value=""></option>
                                    {listCategories.map((category, index) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            }
                            {errors.productCategory && <div className="text-danger">{errors.productCategory}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Import Price</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="50000"
                                value={importprice}
                                onChange={(event) => setImportprice(event.target.value)}
                                onBlur={() => {
                                    handleBlur("sellingprice", { sellingprice: sellingprice, importprice: importprice });
                                    handleBlur("importprice", importprice);
                                }}
                                onFocus={() => {
                                    handleFocus("sellingprice");
                                    handleFocus("importprice");
                                }}
                            />
                            {errors.importprice && <div className="text-danger">{errors.importprice}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Selling Price</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="80000"
                                value={sellingprice}
                                onChange={(event) => setSellingprice(event.target.value)}
                                onBlur={() => handleBlur("sellingprice", { sellingprice: sellingprice, importprice: importprice })}
                                onFocus={() => handleFocus("sellingprice")}
                            />
                            {errors.sellingprice && <div className="text-danger">{errors.sellingprice}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Weight (g)</label>
                            <input type="text" className="form-control" placeholder="500" value={weight} onChange={(event) => setWeight(event.target.value)} onBlur={() => handleBlur("weight", weight)} onFocus={() => handleFocus("weight")} />
                            {errors.weight && <div className="text-danger">{errors.weight}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Count </label>
                            <input type="text" className="form-control" placeholder="500" value={count} onChange={(event) => setCount(event.target.value)} onBlur={() => handleBlur("productCount", count)} onFocus={() => handleFocus("productCount")} />
                            {errors.productCount && <div className="text-danger">{errors.productCount}</div>}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Description</label>
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
                                Upload file image
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
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateProduct()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalCreateProduct;
