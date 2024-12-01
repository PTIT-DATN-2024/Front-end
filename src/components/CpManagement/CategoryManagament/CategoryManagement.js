import { useState } from "react";
import Button from "react-bootstrap/Button";
import ModalCreateCategory from "./ModalCreateCategory";
import "./CategoryManagement.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect } from "react";
import { getAllCategories } from "../../../services/apiServices";
import { toast } from "react-toastify";
import ModalUpdateCategory from "./modalUpdateCategory";
import TableCategoriesPaginate from "./tableCategoryPaginate";
import ModalDeleteCategory from "./ModalDeleteCategory";
import ModalViewCategory from "./ModalViewCategory";
import { useDispatch } from "react-redux";
const CategoryManagement = (props) => {
    const dispatch = useDispatch();
    const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
    const [showModalUpdateCategory, setShowModalUpdateCategory] = useState(false);
    const [showModalDeleteCategory, setShowModalDeleteCategory] = useState(false);
    const [showModalViewCategory, setShowModalViewCategory] = useState(false);
    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const handleClickBtnUpdate = (category) => {
        setShowModalUpdateCategory(true);
        setDataUpdate(category);
    };
    const handleClickBtnDelete = (category) => {
        setShowModalDeleteCategory(true);
        setDataDelete(category);
    };
    const handleClickBtnView = (category) => {
        setShowModalViewCategory(true);
        setDataView(category);
    };
    const fetchListCategories = async () => {
        let res = await getAllCategories();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_category",
                payload: res.categories,
            });
            // toast.success(res.MS);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);

    }, []);
    useEffect(() => {
        fetchListCategories();
    }, []);
    return (
        <div className="CategoryManagement_container">
            <div className="CategoryManagement_content">
                <div>
                    <Button variant="primary" onClick={() => setShowModalCreateCategory(true)}>
                        <FcPlus />
                        Thêm danh mục mới
                    </Button>
                </div>
            </div>
            <div className="table_Category_management_content">
                <TableCategoriesPaginate handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnDelete={handleClickBtnDelete} handleClickBtnView={handleClickBtnView} />
            </div>
            <ModalCreateCategory show={showModalCreateCategory} setShow={setShowModalCreateCategory} fetchListCategories={fetchListCategories} />
            <ModalUpdateCategory show={showModalUpdateCategory} setShow={setShowModalUpdateCategory} fetchListCategories={fetchListCategories} dataUpdate={dataUpdate} />

            <ModalDeleteCategory show={showModalDeleteCategory} setShow={setShowModalDeleteCategory} fetchListCategories={fetchListCategories} dataDelete={dataDelete} />
            <ModalViewCategory show={showModalViewCategory} setShow={setShowModalViewCategory} dataView={dataView} />
        </div>
    );
};
export default CategoryManagement;
