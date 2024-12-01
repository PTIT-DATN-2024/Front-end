import { useState } from "react";
import Button from "react-bootstrap/Button";
import ModalCreateOrder from "./ModalCreateOrder";
import "./OrderManagement.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect } from "react";
import { getAllOrders } from "../../../services/apiServices";
import { toast } from "react-toastify";
import ModalUpdateOrder from "./modalUpdateOrder";
import TableOrdersPaginate from "./tableOrderPaginate";
import ModalDeleteOrder from "./ModalDeleteOrder";
import ModalViewOrder from "./ModalViewOrder";
import _ from "lodash";
const OrderManagement = (props) => {
    const [showModalCreateOrder, setShowModalCreateOrder] = useState(false);
    const [showModalUpdateOrder, setShowModalUpdateOrder] = useState(false);
    const [showModalDeleteOrder, setShowModalDeleteOrder] = useState(false);
    const [showModalViewOrder, setShowModalViewOrder] = useState(false);
    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [listOrders, setListOrders] = useState([]);
    const handleClickBtnUpdate = (category) => {
        setShowModalUpdateOrder(true);
        setDataUpdate(category);
    };
    const handleClickBtnDelete = (category) => {
        setShowModalDeleteOrder(true);
        setDataDelete(category);
    };
    const handleClickBtnView = (category) => {
        setShowModalViewOrder(true);
        setDataView(category);
    };
    const fetchListOrders = async () => {
        let res = await getAllOrders();
        if (res.EC === 0) {
            setListOrders(res.orders);
            toast.success(res.MS);
            console.log("fetch res",res.orders);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        fetchListOrders();
        console.log("fetch123",listOrders) ;
    },[] );
    return (
        <div className="OrderManagement_container">
            <div className="table_Order_management_content">
                <TableOrdersPaginate listOrders={listOrders}  handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnDelete={handleClickBtnDelete} handleClickBtnView={handleClickBtnView} />
            </div>
            <ModalCreateOrder show={showModalCreateOrder} setShow={setShowModalCreateOrder} fetchListOrders={fetchListOrders} />
            <ModalUpdateOrder show={showModalUpdateOrder} setShow={setShowModalUpdateOrder} fetchListOrders={fetchListOrders} dataUpdate={dataUpdate} />
            <ModalDeleteOrder show={showModalDeleteOrder} setShow={setShowModalDeleteOrder} fetchListOrders={fetchListOrders} dataDelete={dataDelete} />
            <ModalViewOrder show={showModalViewOrder} setShow={setShowModalViewOrder} dataView={dataView}   />
        </div>
    );
};
export default OrderManagement;
