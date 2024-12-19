import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateProduct, getAllProducts, putUpdateProduct, deleteProduct } from "../../../services/apiServices";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
function ModalViewProduct(props) {
    // const FormData = require("form-data");
    const { show, setShow, dataView } = props;
    // console.log("123", dataView)
    // console.log("dâtupdate",dataUpdate);
    const handleClose = () => {
        setShow(false);
        // setName("");
        // setCategory("");
        // setImportprice("");
        // setSellingprice("");
        // setWeight("");
        // setPresentImage("");
        // setDescription("");
        // setCount("");
        // setPreviewImage("");
    };
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [importPrice, setImportprice] = useState("");
    const [sellingPrice, setSellingprice] = useState("");
    const [rate, setRate] = useState("");
    const [numberVote, setNumberVote] = useState("");
    const [productDiscount, setProductDiscount] = useState("0");
    const [status, setStatus] = useState("");
    const [weight, setWeight] = useState("");
    const [presentImage, setPresentImage] = useState("");
    const [description, setDescription] = useState("");
    const [count, setCount] = useState("");
    const [previewImage, setPreviewImage] = useState([]);
    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setName(dataView.name);
            setCategory(dataView.category.categoryId);
            setImportprice(dataView.importPrice);
            setSellingprice(dataView.sellingPrice);
            setWeight(dataView.weight);
            setPresentImage(`${dataView.productImages}`);
            setDescription(dataView.description);
            setCount(dataView.total);
            setPreviewImage(dataView.productImages);
            setRate(dataView.rate);
            setNumberVote(dataView.numberVote);
            setStatus(dataView.status);
            setProductDiscount(dataView.productDiscount);
        }
    }, [dataView]);
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalViewProduct" >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin sản phẩm: {dataView && dataView.name ? dataView.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Tên sản phẩm</label>
                            <input type="text" className="form-control" placeholder="not found" value={name} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Danh mục</label>
                            <select className="form-control form-select" disabled >
                                <option selected>{dataView?.category?.name}</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giá nhập (VND)</label>
                            <input type="text" className="form-control" placeholder="not found" value={importPrice} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giá bán (VND)</label>
                            <input type="text" className="form-control" placeholder="not found" value={sellingPrice} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Trọng lượng (g)</label>
                            <input type="text" className="form-control" placeholder="not found" value={weight} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Số lượng</label>
                            <input type="text" className="form-control" placeholder="not found" value={count} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Điểm đánh giá</label>
                            <input type="text" className="form-control" placeholder="not found" value={rate} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Số lượng đánh giá</label>
                            <input type="text" className="form-control" placeholder="not found" value={numberVote} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giảm giá (%)</label>
                            <input type="text" className="form-control" placeholder="0" value={productDiscount} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Trạng thái</label>
                            <input type="text" className="form-control" placeholder="not found" value={status} disabled />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Mô tả</label>
                            <input type="text" className="form-control" placeholder="not found" value={description} disabled />
                        </div>
                        {previewImage.map((img, index) => (
                            <div className="col-12  img-preview">
                                <img src={img.image} alt="preview image" />
                            </div>
                        ))}

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
