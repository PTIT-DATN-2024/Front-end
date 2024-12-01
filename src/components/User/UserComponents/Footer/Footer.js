import "./Footer.scss";
import { FaShippingFast, FaSync, FaCreditCard, FaComment } from "react-icons/fa";

const Footer = (props) => {
    return (
        <div className="footer">
            <div className="footer-links" style={{ background: "#fbfbfb", borderTop: "1px solid #dadada" }}>
                <div className="khaipv-footer-policies">
                    <div className="policy-container">
                        <div className="policy-icon">
                            <FaShippingFast />
                        </div>
                        <div className="policy-info">
                            <span className="policy-info-title">CHÍNH SÁCH GIAO HÀNG</span>
                            <span className="policy-info-content">Nhận hàng và thanh toán tại nhà</span>
                        </div>
                    </div>
                    <div className="policy-container">
                        <div className="policy-icon">
                            <FaSync />
                        </div>
                        <div className="policy-info">
                            <span className="policy-info-title">ĐỔI TRẢ DỄ DÀNG</span>
                            <span className="policy-info-content">1 đổi 1 trong 15 ngày</span>
                        </div>
                    </div>
                    <div className="policy-container">
                        <div className="policy-icon">
                            <FaCreditCard />
                        </div>
                        <div className="policy-info">
                            <span className="policy-info-title">THANH TOÁN TIỆN LỢI</span>
                            <span className="policy-info-content">Trả tiền mặt, CK, trả góp 0%</span>
                        </div>
                    </div>
                    <div className="policy-container">
                        <div className="policy-icon">
                            <FaComment />
                        </div>
                        <div className="policy-info">
                            <span className="policy-info-title">HỖ TRỢ NHIỆT TÌNH</span>
                            <span className="policy-info-content">Tư vấn, giải đáp mọi thắc mắc</span>
                        </div>
                    </div>
                </div>

                <div style={{ background: "#fff", borderTop: "1px solid #dadada" }}>
                    <div className="khaipv-footer-links">
                        <div className="links-group-container">
                            <p>
                                <a href="#" target="_blank">
                                    <img src="http://localhost:8080/uploads/categories/logo.png" alt="logo" style={{ height: "80px", width: "160px", objectFit: "contain" }} />
                                </a>
                            </p>
                            <span className="links-group-title">Tổng đài</span>
                            <p className="hotline">
                                <span>
                                    Mua hàng: <b>19001903</b>
                                </span>
                                <br />
                                <span>
                                    Khiếu nại: <b>19001903</b>
                                </span>
                            </p>
                            <span className="links-group-title">Phương thức thanh toán</span>
                            <img className="payment-method loading" src="https://hanoicomputercdn.com/media/lib/16-08-2024/pttt.png" alt="phương thức thanh toán" data-was-processed="true" />
                        </div>

                        <div className="links-group-container">
                            <span className="links-group-title">Giới thiệu KAP</span>
                            <p>
                                <a href="">Giới thiệu công ty</a>
                            </p>
                            <p>
                                <a href="/lien-he-hop-tac-kinh-doanh" target="_blank">
                                    Liên hệ hợp tác kinh doanh
                                </a>
                            </p>
                            <p>
                                <a href="" target="_blank">
                                    Thông tin tuyển dụng
                                </a>
                            </p>
                            <p>
                                <a href="" target="_blank">
                                    Tin công nghệ
                                </a>
                            </p>
                            <p>
                                <a href="/tin-tuc" target="_blank">
                                    Tin tức
                                </a>
                            </p>
                        </div>

                        <div className="links-group-container">
                            <span className="links-group-title">Hỗ trợ khách hàng</span>
                            <p>
                                <a href="/tra-don-hang" target="_blank">
                                    Tra cứu đơn hàng
                                </a>
                            </p>
                            <p>
                                <a href="/huong-dan-mua-hang-truc-tuyen" target="_blank">
                                    Hướng dẫn mua hàng trực tuyến
                                </a>
                            </p>
                            <p>
                                <a href="/huong-dan-thanh-toan" target="_blank">
                                    Hướng dẫn thanh toán
                                </a>
                            </p>
                            <p>
                                <a href="/huong-dan-mua-hang-tra-gop" target="_blank">
                                    Hướng dẫn mua hàng trả góp
                                </a>
                            </p>
                            <p>
                                <a href="" target="_blank">
                                    Bảng giá vật tư và dịch vụ sửa chữa lắp đặt
                                </a>
                            </p>
                            <p>
                                <a href="" target="_blank">
                                    In hóa đơn điện tử
                                </a>
                            </p>
                            <p>
                                <a href="" target="_blank">
                                    Góp ý, Khiếu Nại
                                </a>
                            </p>
                        </div>

                        <div className="links-group-container">
                            <span className="links-group-title">Chính sách chung</span>
                            <p>
                                <a href="/chinh-sach-quy-dinh-chung" target="_blank">
                                    Chính sách, quy định chung
                                </a>
                            </p>
                            <p>
                                <a href="/chinh-sach-bao-hanh" target="_blank">
                                    Chính sách bảo hành
                                </a>
                            </p>
                            <p>
                                <a href="/chinh-sach-cho-doanh-nghiep" target="_blank">
                                    Chính sách cho doanh nghiệp
                                </a>
                            </p>
                            <p>
                                <a href="/chinh-sach-hang-chinh-hang" target="_blank">
                                    Chính sách hàng chính hãng
                                </a>
                            </p>
                            <p>
                                <a href="/chinh-sach-bao-mat-thong-tin-khach-hang" target="_blank">
                                    Bảo mật thông tin khách hàng
                                </a>
                            </p>
                            <p>
                                <a target="_blank" href="/chinh-sach-nhap-lai-tinh-phi">
                                    Chính sách nhập lại tính phí
                                </a>
                            </p>
                            <p>
                                <a target="_blank" href="/chinh-sach-giao-hang">
                                    Chính sách giao hàng
                                </a>
                            </p>
                        </div>

                        <div className="links-group-container">
                            <span className="links-group-title">Thông tin khuyến mại</span>
                            <p>
                                <a href="" target="_blank">
                                    Thông tin khuyến mại
                                </a>
                            </p>
                            <p>
                                <a href="" target="_blank">
                                    Sản phẩm khuyến mại
                                </a>
                            </p>
                            <p>
                                <a href="">Sản phẩm mới</a>
                            </p>

                            <span className="links-group-title">Kết nối với KAP</span>
                            <span className="footer-social-icons">
                                <a href="" target="_blank">
                                    <i className="icons fab fa-facebook-f"></i>
                                </a>
                                <a href="" target="_blank">
                                    <i className="icons fab fa-youtube"></i>
                                </a>
                                <a href="" target="_blank">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="" target="_blank">
                                    <i className="fab fa-tiktok"></i>
                                </a>
                                <a href="" target="_blank">
                                    <img src="https://hanoicomputercdn.com/media/lib/31-05-2024/news.png" alt="news" className="loading" data-was-processed="true" />
                                </a>
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ background: "#fbfbfb", borderTop: "1px solid #dadada", padding: "10px 0", textAlign: "center" }}>
                    <span className="footer-info">
                        © 2024 KAP. All rights reserved. | Thiết kế website{" "}
                        <a href="" target="_blank">
                            KAP
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
