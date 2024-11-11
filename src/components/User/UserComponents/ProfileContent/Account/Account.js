import React from "react";
import "./Account.scss";

const Account = () => {
    return (
        <>
            <div className="title-tk-2021">Thông tin tài khoản</div>
            <div className="box-cus-info-2021-ct" id="manhinhtaikhoan1">
                <div className="item-tk">
                    <label>Họ tên</label>
                    <div className="item-tk-ct">
                        <input type="text" value="nguyễn ngọc anh" className="inputText" readOnly />
                        <div className="item-tk-ct-note"></div>
                    </div>
                </div>
                <div className="item-tk">
                    <label>Số điện thoại</label>
                    <div className="item-tk-ct">
                        <input type="text" value="Chưa cập nhật số điện thoại" className="inputText" style={{ fontStyle: "italic", color: "red" }}readOnly />
                        <div className="item-tk-ct-note" id="js-sms-result"></div>
                    </div>
                </div>
                <div className="item-tk">
                    <label>Email</label>
                    <div className="item-tk-ct">
                        <input type="text" value="ngocanh20021025@gmail.com" className="inputText" readOnly />
                        <div className="item-tk-ct-note"></div>
                    </div>
                </div>
                <div className="item-tk">
                    <label>Giới tính</label>
                    <div className="item-tk-ct label-select-radio">
                        <input type="text" value="Nam" className="inputText" readOnly />
                    </div>
                </div>
                <div className="item-tk">
                    <label>Địa chỉ</label>
                    <div className="item-tk-ct">
                        <input type="text" value="" className="inputText" readOnly />
                        <div className="item-tk-ct-note"></div>
                    </div>
                </div>
                <div className="item-tk">
                    <label></label>
                    <div className="item-tk-ct">
                        <a href="" type="submit" className="tk-btn-submit">
                            Chỉnh sửa thông tin
                        </a>
                    </div>
                </div>
            </div>
        </> 
    );
};

export default Account;
