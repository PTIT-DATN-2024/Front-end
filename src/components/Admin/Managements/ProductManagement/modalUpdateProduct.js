import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateProduct } from "../../../../services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
const ModalUpdateProduct = (props) => {
    const token = useSelector((state) => state.user.account.access_token);
    const listCategories = useSelector((state) => state.category.listCategories);
    // const FormData = require("form-data");
    const { show, setShow, dataUpdate } = props;
    const handleClose = () => {
        setShow(false);
        // setName("");
        // setCategory("");
        // setImportprice("");
        // setSellingprice("");
        // setWeight("");
        // setPresentImage("");
        // setDescriptiom("");
        // setCount("");
        // setPreviewImage("");
    };
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [importprice, setImportprice] = useState("");
    const [sellingprice, setSellingprice] = useState("");
    const [weight, setWeight] = useState("");
    const [presentImage, setPresentImage] = useState("");
    const [description, setDescriptiom] = useState("");
    const [count, setCount] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setCategory(dataUpdate.category.idCategory);
            setImportprice(dataUpdate.importprice);
            setSellingprice(dataUpdate.sellingprice);
            setWeight(dataUpdate.weight);
            setPresentImage(dataUpdate.presentImage);
            setDescriptiom(dataUpdate.description);
            setCount(dataUpdate.count);
            setPreviewImage(`${dataUpdate.presentImage}`);
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
    const handleSubmitUpdateCategory = async (event) => {
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
        formData.append("weight", weight);
        formData.append("importprice", importprice);
        formData.append("sellingprice", sellingprice);
        formData.append("description", description);
        formData.append("count", count);
        formData.append("category", category);
        formData.append("presentImage", presentImage);
        let res_data = await putUpdateProduct(dataUpdate._id, formData,config);
        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            handleClose();
            await props.fetchListProducts();
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
        }
    };
    // console.log(props.dataUpdate);
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalUpdateCategory">
                <Modal.Header closeButton>
                    <Modal.Title>Update Product: {dataUpdate && dataUpdate.name ? dataUpdate.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            {
                                <select className="form-control form-select" onChange={(event) => setCategory(event.target.value)} placeholder={!_.isEmpty(dataUpdate) ? dataUpdate.category.nameCategory : ""}>
                                    {listCategories.map((category) => {
                                        return (
                                            <option key={category._id} value={category._id} selected={!_.isEmpty(dataUpdate) ? category.name === dataUpdate.category.nameCategory : false}>
                                                {category.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            }
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Import Price</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={importprice} onChange={(event) => setImportprice(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Selling Price</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={sellingprice} onChange={(event) => setSellingprice(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Weight</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={weight} onChange={(event) => setWeight(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Count</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={count} onChange={(event) => setCount(event.target.value)} />
                        </div>
                        <div className="col-3">
                            <label className="form-label label_input-file" htmlFor="inputFileProduct">
                                <FcPlus />
                                Upload file image
                            </label>
                            <input type="file" className="form-control" hidden id="inputFileProduct" onChange={(event) => handleUploadImage(event)} />
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
                    <Button variant="primary" onClick={() => handleSubmitUpdateCategory()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUpdateProduct;
