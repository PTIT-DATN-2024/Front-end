import { useState } from "react";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./ProductManagement.scss";
import { getAllCategories, getAllProducts } from "../../../../services/apiServices";
import TableProductsPaginate from "./tableProductPaginate"; 
import ModalCreateProduct from "./ModalCreateProduct";
import ModalUpdateProduct from "./modalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalViewProduct from "./ModalViewProduct";

const ProductManagement = (props) => {
    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
    const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);
    const [showModalViewProduct, setShowModalViewProduct] = useState(false);
    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [listProducts, setListProducts] = useState([]);

    const handleClickBtnUpdate = (product) => {
        setShowModalUpdateProduct(true);
        setDataUpdate(product);
    };
    const handleClickBtnDelete = (product) => {
        setShowModalDeleteProduct(true);
        setDataDelete(product);
    };
    const handleClickBtnView = (product) => {
        setShowModalViewProduct(true);
        setDataView(product);
    };

    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            setListProducts(res.products);
            toast.success(res.MS);
        }
    };
    const [listCategories, setListCategories] = useState([]);
    const fetchListCategories = async () => {
        let res = await getAllCategories();
        // console.log(res);
        if (res.EC === 0) {
            setListCategories(res.categories);
            // toast.success(res.MS);
            // console.log(res.categories);
        }
    };
    useEffect(() => {
        fetchListProducts();
        fetchListCategories();
    }, []);
    return (
        <div className="ProductManagement_container">
            <div className="Title">đây là ProductManagement</div>
            <div className="ProductManagement_content">
                <div>
                    <Button variant="primary" onClick={() => {setShowModalCreateProduct(true);
                        fetchListCategories();
                    }}>
                        <FcPlus />
                        Add new Product
                    </Button>
                </div>
            </div>
            <div className="table_Category_management_content">
                <TableProductsPaginate listProducts={listProducts} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnDelete={handleClickBtnDelete} handleClickBtnView={handleClickBtnView} listCategories={listCategories}/>
            </div>
            <ModalCreateProduct show={showModalCreateProduct} setShow={setShowModalCreateProduct} fetchListProducts={fetchListProducts} listCategories={listCategories}/>
            <ModalUpdateProduct show={showModalUpdateProduct} setShow={setShowModalUpdateProduct} fetchListProducts={fetchListProducts} dataUpdate={dataUpdate} listCategories={listCategories}/>

            <ModalDeleteProduct show={showModalDeleteProduct} setShow={setShowModalDeleteProduct} fetchListProducts={fetchListProducts} dataDelete={dataDelete} />
            <ModalViewProduct show={showModalViewProduct} setShow={setShowModalViewProduct} dataView={dataView} fetchListProducts={fetchListProducts} listCategories={listCategories}/>
        </div>
    );
};
export default ProductManagement;
