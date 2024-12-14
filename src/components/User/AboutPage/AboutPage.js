const AboutPage = (props) => {

    return (
        <div className="he-thong-header">
            <h1 className="he-thong-title">GIỚI THIỆU VỀ KAP STORE</h1>
            <h2>GIỚI THIỆU CHUNG</h2>
            <p style={{ lineHeight: '1.5em' }}>
                <strong>Công ty Cổ phần Đầu tư Công nghệ KAP STORE</strong> (viết tắt là “<strong>KAP</strong>”, tiền thân là Công ty Cổ phần Máy tính Hà Nội, sở hữu thương hiệu <strong>KAPSTORE</strong>), được thành lập vào tháng 9/2001, hoạt động chủ yếu trong lĩnh vực bán lẻ các sản phẩm máy tính và thiết bị văn phòng. Trải qua chặng đường hơn 20 năm phát triển, đến nay KAP đã trở thành một trong những thương hiệu hàng đầu trong lĩnh vực kinh doanh các sản phẩm Công nghệ thông tin tại Việt Nam với hệ thống các showroom quy mô và hiện đại trải dài từ Bắc vào Nam.
            </p>
            <p style={{ lineHeight: '1.5em' }}>
                Nhiều tổ chức uy tín liên tục đánh giá cao KAP với nhiều giải thưởng danh giá: Top 50 Nhãn hiệu nổi tiếng Việt Nam do Hội Sở hữu Trí tuệ Việt Nam công nhận và trao tặng; Top 500 Doanh nghiệp tăng trưởng nhanh nhất Việt Nam 2021 và 2022 (FAST500), top 500 Doanh nghiệp lớn nhất Việt Nam 2021 (VNR500) do Vietnam Report công nhận và trao tặng, top 50 Thương hiệu Uy tín Hàng đầu Châu Á 2022 do Trung tâm Nghiên cứu Phát triển Doanh nghiệp Châu Á phối hợp với tổ chức Giám sát Chất lượng Quốc tế xét chọn.
            </p>
            <p style={{ lineHeight: '1.5em' }}>
                Với khẩu hiệu <strong>“Uy tín tạo dựng niềm tin”</strong>, KAP mong muốn xây dựng “niềm tin” của Khách hàng bằng chất lượng dịch vụ tốt nhất, vượt trội nhất. Đó cũng chính là kim chỉ nam cho sự phát triển bền vững mà HACOM hướng đến.
            </p>
            <h2>TẦM NHÌN VÀ SỨ MỆNH</h2>
            <p style={{ lineHeight: '1.5em', fontWeight: 'bold' }}>Tầm nhìn:</p>
            <p style={{ lineHeight: '1.5em' }}>- Là chuỗi bán lẻ các sản phẩm công nghệ hàng đầu với độ phủ rộng khắp các tỉnh thành trên cả nước.</p>
            <p style={{ lineHeight: '1.5em', fontWeight: 'bold' }}>Sứ mệnh:</p>
            <p style={{ lineHeight: '1.5em' }}>- Với sứ mệnh phụng sự, chúng tôi đem đến cho khách hàng những trải nghiệm và dịch vụ ưu việt, qua đó tạo nên những giá trị tốt đẹp hơn cho cộng đồng và cuộc sống.</p>
            <br />
            <h2>GIÁ TRỊ CỐT LÕI</h2>
            <p>
                Văn hóa KAP được thể hiện qua bốn giá trị cốt lõi: <span style={{ color: '#000080' }}><strong>TẬN TÂM – TRÁCH NHIỆM – SÁNG TẠO – KHÁC BIỆT</strong></span>
            </p>
            {/* Chỉ trên pc */}
            <div className="hnc-static-equal">
                <div className="hnc-static-all-center hnc-static-equal-half" style={{ border: '1px solid #FA8C11' }}>
                    <img
                        src="https://hacom.vn/media/lib/gia-tri-cot-loi-my-4-150x150.jpg"
                        alt=""
                        width="150"
                        height="150"
                        className="hnc-static-round-img loading"
                        data-was-processed="true"
                    />
                    <h3 className="hnc-static-brand-text" style={{ color: '#FA8C11' }}>TẬN TÂM</h3>
                    <p className="hnc-static-slogan-text"><em style={{ fontSize: '1rem' }}>“Vượt trên sự mong đợi”</em></p>
                    <p className="hnc-static-explain-text">KAP đặt tận tâm là nền tảng của phục vụ, lấy khách hàng làm trung tâm, mang đến những giá trị đích thực tới khách hàng và đối tác.</p>
                </div>
                <div className="hnc-static-all-center hnc-static-equal-half" style={{ border: '1px solid #EC1922' }}>
                    <img
                        src="https://hacom.vn/media/lib/gia-tri-cot-loi-my-5-150x150.jpg"
                        alt=""
                        width="150"
                        height="150"
                        className="hnc-static-round-img loading"
                        data-was-processed="true"
                    />
                    <h3 className="hnc-static-brand-text" style={{ color: '#EC1922' }}>TRÁCH NHIỆM</h3>
                    <p className="hnc-static-slogan-text"><em style={{ fontSize: '1rem' }}>“Chúng ta luôn cố gắng”</em></p>
                    <p className="hnc-static-explain-text">KAP đặt chữ TÍN lên hàng đầu, luôn thể hiện tinh thần trách nhiệm cao cùng phương châm “Làm hết việc chứ không làm hết giờ”.</p>
                </div>
                <div className="hnc-static-all-center hnc-static-equal-half" style={{ border: '1px solid #26A9E1' }}>
                    <img
                        src="https://hacom.vn/media/lib/gia-tri-cot-loi-my-7-150x150.jpg"
                        alt=""
                        width="150"
                        height="150"
                        className="hnc-static-round-img loading"
                        data-was-processed="true"
                    />
                    <h3 className="hnc-static-brand-text" style={{ color: '#26A9E1' }}>KHÁC BIỆT</h3>
                    <p className="hnc-static-slogan-text"><em style={{ fontSize: '1rem' }}>“Dám nghĩ – Dám làm”</em></p>
                    <p className="hnc-static-explain-text">KAP đặt sự khác biệt là chủ trương để xây dựng công ty thành một doanh nghiệp dẫn đầu.</p>
                </div>
                <div className="hnc-static-all-center hnc-static-equal-half" style={{ border: '1px solid #242156' }}>
                    <img
                        src="https://hacom.vn/media/lib/gia-tri-cot-loi-my-6-150x150.jpg"
                        alt=""
                        width="150"
                        height="150"
                        className="hnc-static-round-img loading"
                        data-was-processed="true"
                    />
                    <h3 className="hnc-static-brand-text" style={{ color: '#242156' }}>SÁNG TẠO</h3>
                    <p className="hnc-static-slogan-text"><em style={{ fontSize: '1rem' }}>“Không gì là không thể”</em></p>
                    <p className="hnc-static-explain-text">KAP coi sáng tạo là đòn bẩy để phát triển, luôn đề cao các sáng kiến để hoàn thiện, hiệu quả hơn, nâng tầm giá trị.</p>
                </div>
            </div>
            <br />
            <h2 style={{ marginTop: '30px' }}>HÀNH TRÌNH PHÁT TRIỂN</h2>
            <ul className="static-ul">
                <li><span className="static-equal">2021</span>: Thành lập công ty TNHH MÁY TÍNH KAP</li>
                <li><span className="static-equal">2022</span>: Áp dụng ISO 9000:2001, Hệ thống tiêu chuẩn quản lý chất lượng sản phẩm trên toàn cầu</li>
                <li><span className="static-equal">2024</span>: Khai trương chi nhánh KAP tại PTIT</li>
                {/* Các mốc phát triển khác */}
            </ul>
            <br />


        </div>
    )
}
export default AboutPage;