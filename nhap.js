import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getDataEcommerce } from "../../../services/apiServices"; // Giả sử đây là API chung
import moment from "moment";
import TotalSellChart from "./totalsellDB";
import { FaStar } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import "./DashBoard.scss";

const DashBoard = () => {
    // State lưu trữ dữ liệu
    const [data, setData] = useState({});
    const [by, setBy] = useState("year"); // Mặc định là theo năm
    const [time, setTime] = useState(moment().year()); // Năm hiện tại
    const [month, setMonth] = useState(moment().month() + 1); // Tháng hiện tại (1-based)

    // Hàm gọi API chung
    const fetchData = async () => {
        try {
            // Tùy vào 'by' là 'year' hoặc 'month' sẽ gửi thông tin tương ứng
            let res;
            if (by === "year") {
                // Gửi 'month: null' khi chọn theo năm
                res = await getDataEcommerce({ month: null, year: time });
            } else if (by === "month") {
                // Gửi tháng cụ thể khi chọn theo tháng
                res = await getDataEcommerce({ month: month, year: time });
            }

            if (res.EC === 0) {
                setData(res.data);
                toast.success(res.MS || "Tải dữ liệu thành công!");
            } else {
                toast.error(res.MS || "Không thể tải dữ liệu!");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Có lỗi xảy ra khi tải dữ liệu!");
        }
    };

    // Xử lý thay đổi giá trị `by` (theo năm hoặc tháng)
    const handleByChange = (newBy) => {
        setBy(newBy);
        fetchData(); // Gọi lại API mỗi khi `by` thay đổi
    };

    // Xử lý thay đổi giá trị `time` (chọn năm hoặc tháng)
    const handleTimeChange = (newTime) => {
        setTime(newTime);
        fetchData(); // Gọi lại API mỗi khi `time` thay đổi
    };

    // Xử lý thay đổi tháng khi `by` là month
    const handleMonthChange = (newMonth) => {
        setMonth(newMonth);
        if (by === "month") {
            fetchData(); // Gọi lại API mỗi khi `month` thay đổi
        }
    };

    // Gọi API khi `time`, `month`, hoặc `by` thay đổi
    useEffect(() => {
        fetchData(); // Gọi API khi component load và khi các giá trị `time`, `month`, `by` thay đổi
    }, [time, month, by]);

    return (
        <div className="DashBoard-container">
            <div className="eco_dashBoard_left">
                <h2>Biểu đồ thống kê doanh thu</h2>
                <div className="selectBox">
                    {/* Chọn loại thống kê: theo năm hoặc tháng */}
                    <div>
                        <label htmlFor="by">Chọn loại thống kê:</label>
                        <select
                            id="by"
                            value={by}
                            onChange={(e) => handleByChange(e.target.value)}
                        >
                            <option value="year">Theo năm</option>
                            <option value="month">Theo tháng</option>
                        </select>
                    </div>
                    {/* Chọn thời gian (năm hoặc tháng) */}
                    <div>
                        <label htmlFor="time">Chọn năm:</label>
                        <select
                            id="time"
                            value={time}
                            onChange={(e) => handleTimeChange(Number(e.target.value))}
                        >
                            {Array.from({ length: 5 }, (_, i) => moment().year() - i).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Nếu `by = month`, chọn tháng */}
                    {by === "month" && (
                        <div>
                            <label htmlFor="month">Chọn tháng:</label>
                            <select
                                id="month"
                                value={month}
                                onChange={(e) => handleMonthChange(Number(e.target.value))}
                            >
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((monthOption) => (
                                    <option key={monthOption} value={monthOption}>
                                        Tháng {monthOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                {/* Thống kê đơn hàng */}
                <div className="statistics_order">
                    <div className="item ordernew">
                        <FaStar className="icon" />
                        <div className="content">
                            <div className="heading">{data?.totalOrders} đơn hàng mới</div>
                            <div className="desc">Đang chờ xác nhận</div>
                        </div>
                    </div>
                    <div className="item orderproces">
                        <FaPause className="icon" />
                        <div className="content">
                            <div className="heading">{data?.totalCompleteOrders} đơn hàng</div>
                            <div className="desc">Hoàn thành</div>
                        </div>
                    </div>
                    <div className="item ordercancle">
                        <IoIosClose className="icon" />
                        <div className="content">
                            <div className="heading">{data?.totalCancelOrders} đơn hàng</div>
                            <div className="desc">Đã hủy</div>
                        </div>
                    </div>
                </div>
                {/* Hiển thị biểu đồ TotalSellChart */}
                <div className="total_sell_chart">
                    <TotalSellChart
                        data={data?.revenue || []}
                    />
                </div>
            </div>
            <div className="eco_dashBoard_right">
                <div className="item_top">
                    <div className="left">Tổng doanh thu: {data?.totalRevenue || 0} VNĐ</div>
                    <div className="right">Tổng khách hàng: {data?.totalCustomers || 0}</div>
                </div>
                <div className="item_bottom">
                    <div className="left">
                        Tổng sản phẩm: {data?.totalProducts || 0} <br />
                        Tổng danh mục: {data?.totalCategories || 0}
                    </div>
                    <div className="right">
                        Kách hàng mua: {data?.topSpent?.[0]?.[0]?.email || "Không có dữ liệu"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
