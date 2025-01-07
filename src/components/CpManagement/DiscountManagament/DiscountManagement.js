import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./DiscountManagement.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect } from "react";
import { getAllDiscounts } from "../../../services/apiServices";
import { toast } from "react-toastify";
import ModalCreateDiscount from "./ModalCreateDiscount";
import ModalUpdateDiscount from "./modalUpdateDiscount";
import TableDiscountsPaginate from "./tableDiscountPaginate";
import ModalDeleteDiscount from "./ModalDeleteDiscount";
import ModalViewDiscount from "./ModalViewDiscount";
import { useDispatch, useSelector } from "react-redux";
const DiscountManagement = (props) => {
    const dispatch = useDispatch();
    const [showModalCreateDiscount, setShowModalCreateDiscount] = useState(false);
    const [showModalUpdateDiscount, setShowModalUpdateDiscount] = useState(false);
    const [showModalDeleteDiscount, setShowModalDeleteDiscount] = useState(false);
    const [showModalViewDiscount, setShowModalViewDiscount] = useState(false);
    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const account = useSelector((state) => state.user.account);
    const handleClickBtnUpdate = (discount) => {
        setShowModalUpdateDiscount(true);
        setDataUpdate(discount);
    };
    const handleClickBtnDelete = (discount) => {
        setShowModalDeleteDiscount(true);
        setDataDelete(discount);
    };
    const handleClickBtnView = (discount) => {
        setShowModalViewDiscount(true);
        setDataView(discount);
    };
    const fetchListDiscounts = async () => {
        let res = await getAllDiscounts();
        if (res.EC === 0) {
            dispatch({
                type: "fetch_all_discount",
                payload: res.productDiscounts,
            });
            // toast.success(res.MS);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);

    }, []);
    useEffect(() => {
        fetchListDiscounts();
    }, []);
    return (
        <div className="CategoryManagement_container">
            <h3>Danh sách chương trình giảm giá</h3>
            {account.role === "ADMIN" && (
                <div className="CategoryManagement_content">
                    <div>
                        <Button variant="primary" onClick={() => setShowModalCreateDiscount(true)}>
                            <FcPlus />
                            Thêm chương trình giảm giá mới
                        </Button>
                    </div>
                </div>
            )}

            <div className="table_Category_management_content">
                <TableDiscountsPaginate handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnDelete={handleClickBtnDelete} handleClickBtnView={handleClickBtnView} />
            </div>
            <ModalCreateDiscount show={showModalCreateDiscount} setShow={setShowModalCreateDiscount} fetchListDiscounts={fetchListDiscounts} />
            <ModalUpdateDiscount show={showModalUpdateDiscount} setShow={setShowModalUpdateDiscount} fetchListDiscounts={fetchListDiscounts} dataUpdate={dataUpdate} />

            <ModalDeleteDiscount show={showModalDeleteDiscount} setShow={setShowModalDeleteDiscount} fetchListDiscounts={fetchListDiscounts} dataDelete={dataDelete} />
            <ModalViewDiscount show={showModalViewDiscount} setShow={setShowModalViewDiscount} dataView={dataView} />
        </div>
    );
};
export default DiscountManagement;
