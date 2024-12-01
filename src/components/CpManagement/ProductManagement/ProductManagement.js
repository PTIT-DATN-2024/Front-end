import { useState } from "react";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./ProductManagement.scss";
import { getAllCategories, getAllProducts } from "../../../services/apiServices";
import TableProductsPaginate from "./tableProductPaginate";
import ModalCreateProduct from "./ModalCreateProduct";
import ModalUpdateProduct from "./modalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalViewProduct from "./ModalViewProduct";
import { useDispatch, useSelector } from "react-redux";
const ProductManagement = (props) => {
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.product.listProducts);
    const listCategories = useSelector((state) => state.category.listCategories);
    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
    const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);
    const [showModalViewProduct, setShowModalViewProduct] = useState(false);
    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});

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
            const products = res.products.filter(product => product.isDelete === "False")
            dispatch({
                type: "fetch_all_product",
                payload: products,
            });
            toast.success(res.MS);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);

    }, []);
    useEffect(() => {
        fetchListProducts();
    }, []);
    return (
        <div className="ProductManagement_container">
            <div className="ProductManagement_content">
                <div>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setShowModalCreateProduct(true);
                        }}
                    >
                        <FcPlus />
                        Thêm mới product
                    </Button>
                </div>
            </div>
            <div className="table_Category_management_content">
                <TableProductsPaginate handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnDelete={handleClickBtnDelete} handleClickBtnView={handleClickBtnView} />
            </div>
            <ModalCreateProduct show={showModalCreateProduct} setShow={setShowModalCreateProduct} fetchListProducts={fetchListProducts} />
            <ModalDeleteProduct show={showModalDeleteProduct} setShow={setShowModalDeleteProduct} fetchListProducts={fetchListProducts} dataDelete={dataDelete} />
            <ModalUpdateProduct show={showModalUpdateProduct} setShow={setShowModalUpdateProduct} fetchListProducts={fetchListProducts} dataUpdate={dataUpdate} />
            <ModalViewProduct show={showModalViewProduct} setShow={setShowModalViewProduct} fetchListProducts={fetchListProducts} dataView={dataView} />
        </div>
    );
};
export default ProductManagement;
