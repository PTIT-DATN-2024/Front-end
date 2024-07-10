import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateProduct, getAllProducts, putUpdateProduct, deleteProduct } from "../../../../services/apiServices";
import _ from "lodash";
const ModalUpdateProduct = (props) => {
    // const FormData = require("form-data");
    const { show, setShow, dataUpdate, listCategories } = props;

    // console.log("123", dataUpdate);

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
    const [category, setCategory] = useState(dataUpdate.category);
    const [importprice, setImportprice] = useState("");
    const [sellingprice, setSellingprice] = useState("");
    const [weight, setWeight] = useState("");
    const [presentimage, setPresenimage] = useState("");
    const [description, setDescriptiom] = useState("");
    const [count, setcount] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setCategory(dataUpdate.category);
            setImportprice(dataUpdate.importprice);
            setSellingprice(dataUpdate.sellingprice);
            setWeight(dataUpdate.weight);
            setPresenimage(dataUpdate.presentimage);
            setDescriptiom(dataUpdate.description);
            setcount(dataUpdate.count);
            setPreviewImage(`${dataUpdate.presentimage}`);
        }
    }, [dataUpdate]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setPresenimage(event.target.files[0]);
        } else {
            // setPreviewImage("");
        }
    };
    const handleSubmitUpdateCategory = async (event) => {
        // validate?
        // callapi
        let res_data = await putUpdateProduct(dataUpdate._id, name, category, importprice, sellingprice, weight, presentimage, description, count);
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
                                <select className="form-control form-select" onChange={(event) => setCategory(event.target.value)} placeholder={dataUpdate.category}>
                                    {listCategories.map((category) => {
                                        return (
                                            <option key={category._id} value={category._id} selected={category.name === dataUpdate.category}>
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
                            <label className="form-label">present image</label>
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={presentimage} onChange={(event) => setPresenimage(event.target.value)} />
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
