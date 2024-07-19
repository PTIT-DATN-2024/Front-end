import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateProduct, getAllProducts, putUpdateProduct, deleteProduct } from "../../../../services/apiServices";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
function ModalViewProduct(props) {
    // const FormData = require("form-data");
    const { show, setShow, dataView } = props;

    // console.log("123", dataView);

    // console.log("dâtupdate",dataUpdate);
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
        if (!_.isEmpty(dataView)) {
            setName(dataView.name);
            setCategory(dataView.category.nameCategory);
            setImportprice(dataView.importprice);
            setSellingprice(dataView.sellingprice);
            setWeight(dataView.weight);
            setPresentImage(dataView.presentImage);
            setDescriptiom(dataView.description);
            setCount(dataView.count);
            setPreviewImage(`${dataView.presentImage}`);
        }
    }, [dataView]);
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalUpdateCategory">
                <Modal.Header closeButton>
                    <Modal.Title>View Product: {dataView && dataView.name ? dataView.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={name} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            <select className="form-control form-select" placeholder={!_.isEmpty(dataView)?dataView.category.nameCategory:""} disabled>
                                <option  selected>
                                    {!_.isEmpty(dataView)?dataView.category.nameCategory:""}
                                </option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={description} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Import Price</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={importprice} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Selling Price</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={sellingprice} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Weight</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={weight} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Count</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={count} disabled />
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

export default ModalViewProduct;
