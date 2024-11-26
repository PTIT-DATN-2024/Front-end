import { useState } from "react";
import Button from "react-bootstrap/Button";
import ModalCreateBgImage from "./ModalCreateBgImage";
import "./BgImageManagement.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect } from "react";
import { getAllBgImages } from "../../../services/apiServices";
import { toast } from "react-toastify";
import ModalUpdateBgImage from "./modalUpdateBgImage";
import TableBgImagesPaginate from "./tableBgImagePaginate";
import ModalDeleteBgImage from "./ModalDeleteBgImage";
import ModalViewBgImage from "./ModalViewBgImage";

const BgImageManagement = (props) => {
    const [showModalCreateBgImage, setShowModalCreateBgImage] = useState(false);
    const [showModalUpdateBgImage, setShowModalUpdateBgImage] = useState(false);
    const [showModalDeleteBgImage, setShowModalDeleteBgImage] = useState(false);
    const [showModalViewBgImage, setShowModalViewBgImage] = useState(false);
    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [listBgImages, setListBgImages] = useState([]);
    const handleClickBtnUpdate = (bgImage) => {
        setShowModalUpdateBgImage(true);
        setDataUpdate(bgImage);
    };
    const handleClickBtnDelete = (bgImage) => {
        setShowModalDeleteBgImage(true);
        setDataDelete(bgImage);
    };
    const handleClickBtnView = (bgImage) => {
        setShowModalViewBgImage(true);
        setDataView(bgImage);
    };
    const fetchListBgImages = async () => {
        let res = await getAllBgImages();
        if (res.EC === 0) {
            setListBgImages(res.bgImages);
            toast.success(res.MS);
            console.log(res);
        }
    };
    useEffect(() => {
        fetchListBgImages();
    }, []);
    return (
        <div className="BgImageManagement_container">
            <div className="Title">đây là BgImageManagement</div>
            <div className="BgImageManagement_content">
                <div>
                    <Button variant="primary" onClick={() => setShowModalCreateBgImage(true)}>
                        <FcPlus />
                        Add new BgImage
                    </Button>
                </div>
            </div>
            <div className="table_BgImage_management_content">
                <TableBgImagesPaginate listBgImages={listBgImages} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnDelete={handleClickBtnDelete} handleClickBtnView={handleClickBtnView} />
            </div>
            <ModalCreateBgImage show={showModalCreateBgImage} setShow={setShowModalCreateBgImage} fetchListBgImages={fetchListBgImages} />
            <ModalUpdateBgImage show={showModalUpdateBgImage} setShow={setShowModalUpdateBgImage} fetchListBgImages={fetchListBgImages} dataUpdate={dataUpdate} />

            <ModalDeleteBgImage show={showModalDeleteBgImage} setShow={setShowModalDeleteBgImage} fetchListBgImages={fetchListBgImages} dataDelete={dataDelete} />
            <ModalViewBgImage show={showModalViewBgImage} setShow={setShowModalViewBgImage} dataView={dataView} />
        </div>
    );
};
export default BgImageManagement;
