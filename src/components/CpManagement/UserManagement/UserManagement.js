import { useState } from "react";
import Button from "react-bootstrap/Button";
import ModalCreateUser from "./ModalCreateUser";
import "./UserManagement.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect } from "react";
import { getAllUsers } from "../../../services/apiServices";
import { toast } from "react-toastify";
import ModalUpdateUser from "./modalUpdateUser";
import TableUsersPaginate from "./tableUserPaginate";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalViewUser from "./ModalViewUser";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const UserManagement = (props) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.account.access_token);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    };
    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    };
    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
    };
    const fetchListUsers = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`, // Đặt token vào header Authorization
            },
        };
        let res = await getAllUsers(config);
        if (res.EC === 0) {
            const users = res.users.filter(user => user.isDelete === "False")
            dispatch({
                type: "fetch_all_users",
                payload: users,
            });
            toast.success(res.MS);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);

    }, []);
    useEffect(() => {
        fetchListUsers();
    }, []);
    return (
        <div className="UserManagement_container">
            <div className="UserManagement_content">
                <div>
                    <Button variant="primary" onClick={() => setShowModalCreateUser(true)}>
                        <FcPlus />
                        Tạo tài khoản mới
                    </Button>
                </div>
            </div>
            <div className="table_user_management_content">
                <TableUsersPaginate  handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnDelete={handleClickBtnDelete} handleClickBtnView={handleClickBtnView} />
            </div>
            <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} fetchListUsers={fetchListUsers} />
            <ModalUpdateUser show={showModalUpdateUser} setShow={setShowModalUpdateUser} fetchListUsers={fetchListUsers} dataUpdate={dataUpdate} />

            <ModalDeleteUser show={showModalDeleteUser} setShow={setShowModalDeleteUser} fetchListUsers={fetchListUsers} dataDelete={dataDelete} />
            <ModalViewUser show={showModalViewUser} setShow={setShowModalViewUser} dataView={dataView} />
        </div>
    );
};
export default UserManagement;
