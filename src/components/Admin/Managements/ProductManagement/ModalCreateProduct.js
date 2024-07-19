import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateProduct, getAllProducts, putUpdateProduct, deleteProduct } from "../../../../services/apiServices";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const ModalCreateProduct = (props) => {
    const token = useSelector((state) => state.user.account.access_token);
    const listCategories = useSelector((state) => state.category.listCategories);
    // const FormData = require("form-data");
    const { show, setShow } = props;
    // console.log("liscate",props.listCategories,"list");
    // useEffect(() => {
    //     // if (!_.isEmpty(listCategories)) {
    //     //     setName(dataUpdate.name);
    //     //     // setPassword("");
    //     //     if (dataUpdate.avatar) {
    //     //         // setPreviewImage(`data:image/jpeg;base64,${dataUpdate.avatar}`);
    //     //         // setPreviewImage(`data:image/jpeg;base64,${dataUpdate.avatar}`);
    //     //     }
    //     // }
    // }, []);
    const handleClose = () => {
        setShow(false);
        setName("");
        setCategory("");
        setImportprice("");
        setSellingprice("");
        setWeight("");
        setPresentImage("");
        setDescriptiom("");
        setcount("");
        setPreviewImage("");
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
    const [presentImage, setPresentImage] = useState("");
    const [description, setDescriptiom] = useState("");
    const [count, setcount] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            const file = event.target.files[0];
            setPresentImage(file);
            // const reader = new FileReader();
            // reader.onloadend = () => {
            //     setPresentImage(reader.result);
            // };
            // reader.readAsDataURL(file);
        } else {
            // setPreviewImage("");
        }
    };
    const handleSubmitCreateProduct = async (event) => {
        // validate?
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

        let res_data = await postCreateProduct(formData, config);

        if (res_data && res_data.EC === 0) {
            toast.success(res_data.MS);
            handleClose();
            await props.fetchListProducts();
        }
        if (res_data && res_data.EC !== 0) {
            toast.error(res_data.MS);
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
                            <input type="text" className="form-control" placeholder="Gà lắc phô mai" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            {
                                <select className="form-control form-select" onChange={(event) => setCategory(event.target.value)}>
                                    <option key={0} value=""></option>
                                    {listCategories.map((category, index) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            }
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Import Price</label>
                            <input type="text" className="form-control" placeholder="50000" value={importprice} onChange={(event) => setImportprice(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Selling Price</label>
                            <input type="text" className="form-control" placeholder="80000" value={sellingprice} onChange={(event) => setSellingprice(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Weight (g)</label>
                            <input type="text" className="form-control" placeholder="500" value={weight} onChange={(event) => setWeight(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Count </label>
                            <input type="number" className="form-control" placeholder="500" value={count} onChange={(event) => setcount(event.target.value)} />
                        </div>

                        <div className="col-3">
                            <label className="form-label label_input-file" htmlFor="inputFileProduct">
                                <FcPlus />
                                Upload file image
                            </label>
                            <input type="file" className="form-control" hidden id="inputFileProduct" onChange={(event) => handleUploadImage(event)} />
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
