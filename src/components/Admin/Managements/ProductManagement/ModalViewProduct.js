// import { useState } from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateProduct, getAllProducts, putUpdateProduct, deleteProduct } from "../../../../services/apiServices";
import _ from "lodash";
function ModalViewProduct(props) {
    // const FormData = require("form-data");
    const { show, setShow, dataView, listCategories } = props;

    console.log("123", dataView);

    // console.log("dâtupdate",dataUpdate);
    const handleClose = () => {
        setShow(false);
        // setName("");
        // setCategory("");
        // setImportprice("");
        // setSellingprice("");
        // setWeight("");
        // setPresenimage("");
        // setDescriptiom("");
        // setcount("");
        // setPreviewImage("");
    };
    const [name, setName] = useState("");
    const [category, setCategory] = useState(dataView.category);
    const [importprice, setImportprice] = useState("");
    const [sellingprice, setSellingprice] = useState("");
    const [weight, setWeight] = useState("");
    const [presentimage, setPresenimage] = useState("");
    const [description, setDescriptiom] = useState("");
    const [count, setcount] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setName(dataView.name);
            setCategory(dataView.category);
            setImportprice(dataView.importprice);
            setSellingprice(dataView.sellingprice);
            setWeight(dataView.weight);
            setPresenimage(dataView.presentimage);
            setDescriptiom(dataView.description);
            setcount(dataView.count);
            setPreviewImage(`${dataView.presentimage}`);
        }
    }, [dataView]);
    // console.log(props.dataUpdate);
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
                            <select className="form-control form-select" placeholder={dataView.category} disabled>
                                <option  selected>
                                    {dataView.category}
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
