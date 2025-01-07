import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateDiscount } from "../../../services/apiServices";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import validateFields from "../../Golobal/validate";
const ModalUpdateDiscount = (props) => {
    const token = useSelector((state) => state.user.account.access_token);

    const { show, setShow, dataUpdate } = props;
    const handleClose = () => {
        setShow(false);
        setName("");
        setDiscountAmount("");
        setExpiredDate("");
        setErrors({});
    };
    const [name, setName] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");
    const [expiredDate, setExpiredDate] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setDiscountAmount(dataUpdate.discountAmount);
            setExpiredDate(dataUpdate.expiredDate);
        }
    }, [dataUpdate]);
    const handleBlur = (field, value) => {
        const newErrors = { ...errors, ...validateFields({ [field]: value }) };
        setErrors(newErrors);
    };

    const handleFocus = (field) => {
        const newErrors = { ...errors };
        newErrors[field] = "";
        setErrors(newErrors);
    };
    const handleSubmitUpdateCategory = async (event) => {
        // validate
        const dataValidate = {
            DiscountName: name,
            DiscountAmount: discountAmount,
            ExpiredDate: expiredDate,
        };
        const newErrors = { ...errors, ...validateFields(dataValidate) };
        setErrors(newErrors);
        const allFieldsEmpty = Object.values(errors).every((value) => value === "");
        if (allFieldsEmpty) {
            // callapi
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            };
            const data = {
                name: name,
                discountAmount: discountAmount,
                expiredDate: expiredDate
            }
            
            // const formData = new FormData();
            // formData.append("name", name);


            let res_data = await putUpdateDiscount(dataUpdate.productDiscountId, data, config);
            if (res_data && res_data.EC === 0) {
                toast.success(res_data.MS);
                handleClose();
                await props.fetchListDiscounts();
            }
            if (res_data && res_data.EC !== 0) {
                toast.error(res_data.MS);
            }
        }
    };
    // console.log(props.dataUpdate);
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="ModalUpdateCategory">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin : {dataUpdate && dataUpdate.name ? dataUpdate.name : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Tên</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tết nguyên đán"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                onBlur={() => handleBlur("DiscountName", name)}
                                onFocus={() => handleFocus("DiscountName")}
                            />
                            {errors.discountName && <div className="text-danger">{errors.discountName}</div>}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Số lượng giảm giá (%)</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="60%"
                                value={discountAmount}
                                onChange={(event) => setDiscountAmount(event.target.value)}
                                onBlur={() => handleBlur("DiscountAmount", discountAmount)}
                                onFocus={() => handleFocus("DiscountAmount")}
                            />
                            {errors.discountAmount && <div className="text-danger">{errors.discountAmount}</div>}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Thời gian ( ngày)</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Moo tar"
                                value={expiredDate}
                                onChange={(event) => setExpiredDate(event.target.value)}
                                onBlur={() => handleBlur("ExpiredDate", expiredDate)}
                                onFocus={() => handleFocus("ExpiredDate")}
                            />
                            {errors.expiredDate && <div className="text-danger">{errors.expiredDate}</div>}
                        </div>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateCategory()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUpdateDiscount;
