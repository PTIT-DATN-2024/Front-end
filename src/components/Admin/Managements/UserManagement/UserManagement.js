import { useState } from "react";
import Button from "react-bootstrap/Button";
import ModalCreateUser from "./ModalCreateUser";
import "./UserManagement.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect } from "react";
import { getAllUsers } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import ModalUpdateUser from "./modalUpdateUser";
import TableUsersPaginate from "./tableUserPaginate";
import TableUsers from "./tableUsers";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalViewUser from "./ModalViewUser";

const UserManagement = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [listUsers, setListUsers] = useState([]);
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
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.users);
            toast.success(res.MS);
        }
    };
    useEffect(() => {
        fetchListUsers();
    }, []);
    return (
        <div className="UserManagement_container">
            
            <div className="Title">đây là UserManagement</div>
            <div className="UserManagement_content">
                <div>
                    <Button variant="primary" onClick={() => setShowModalCreateUser(true)}>
                        <FcPlus />
                        Add new user
                    </Button>
                </div>
            </div>
            <div className="table_user_management_content">
                <TableUsersPaginate listUsers={listUsers} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnDelete={handleClickBtnDelete} handleClickBtnView={handleClickBtnView} />
            </div>
            <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} fetchListUsers={fetchListUsers} />
            <ModalUpdateUser show={showModalUpdateUser} setShow={setShowModalUpdateUser} fetchListUsers={fetchListUsers} dataUpdate={dataUpdate} />

            <ModalDeleteUser show={showModalDeleteUser} setShow={setShowModalDeleteUser} fetchListUsers={fetchListUsers} dataDelete={dataDelete} />
            <ModalViewUser show={showModalViewUser} setShow={setShowModalViewUser} dataView={dataView} />
        </div>
    );
};
export default UserManagement;
