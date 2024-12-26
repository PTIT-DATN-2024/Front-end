import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getDataEcommerce } from "../../../services/apiServices";
import moment from "moment";
import ColumnChart from "./ColumnChart";
import { FaStar, FaCheckCircle, FaBoxOpen, FaListAlt, FaDollarSign, FaUsers } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import "./DashBoard.scss";

const Dashboard = () => {
    const [data, setData] = useState({});
    const [by, setBy] = useState("year");
    const [time, setTime] = useState(moment().year());
    const [month, setMonth] = useState(moment().month() + 1);

    const fetchData = async () => {
        try {
            let res;
            if (by === "year") {
                res = await getDataEcommerce({ month: null, year: time });
            } else if (by === "month") {
                res = await getDataEcommerce({ month: month, year: time });
            }

            if (res.EC === 0) {
                setData(res);
                toast.success(res.MS || "Tải dữ liệu thành công!");
            } else {
                toast.error(res.MS || "Không thể tải dữ liệu!");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi tải dữ liệu!");
        }
    };

    const handleByChange = (newBy) => {
        setBy(newBy);
        fetchData();
    };

    const handleTimeChange = (newTime) => {
        setTime(newTime);
        fetchData();
    };

    const handleMonthChange = (newMonth) => {
        setMonth(newMonth);
        if (by === "month") {
            fetchData();
        }
    };

    useEffect(() => {
        fetchData();
    }, [time, month, by]);

    return (
        <div className="dashboard">
            <div className="dashboard__left">
                <h2 className="dashboard__title">Biểu đồ thống kê doanh thu</h2>
                <div className="dashboard__filters">
                    <div className="dashboard__filter">
                        <label htmlFor="by">Chọn loại thống kê:</label>
                        <select
                            id="by"
                            value={by}
                            onChange={(e) => handleByChange(e.target.value)}
                            className="select-box"
                        >
                            <option value="year">Theo năm</option>
                            <option value="month">Theo tháng</option>
                        </select>
                    </div>
                    <div className="dashboard__filter">
                        <label htmlFor="time">Chọn năm:</label>
                        <select
                            id="time"
                            value={time}
                            onChange={(e) => handleTimeChange(Number(e.target.value))}
                            className="select-box"
                        >
                            {Array.from({ length: 5 }, (_, i) => moment().year() - i).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    {by === "month" && (
                        <div className="dashboard__filter">
                            <label htmlFor="month">Chọn tháng:</label>
                            <select
                                id="month"
                                value={month}
                                onChange={(e) => handleMonthChange(Number(e.target.value))}
                                className="select-box"
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
                <div className="dashboard__statistics">
                    <div className="statistics__item statistics__item--new-orders">
                        <FaStar className="statistics__icon" />
                        <div className="statistics__content">
                            <div className="statistics__heading">Đơn hàng mới</div>
                            <div className="statistics__value">{data?.totalOrders || 0}</div>
                        </div>
                    </div>
                    <div className="statistics__item statistics__item--completed-orders">
                        <FaCheckCircle className="statistics__icon" />
                        <div className="statistics__content">
                            <div className="statistics__heading">Đơn hàng hoàn thành</div>
                            <div className="statistics__value">{data?.totalCompleteOrders || 0}</div>
                        </div>
                    </div>
                    <div className="statistics__item statistics__item--cancelled-orders">
                        <IoIosClose className="statistics__icon" />
                        <div className="statistics__content">
                            <div className="statistics__heading">Đơn hàng đã hủy</div>
                            <div className="statistics__value">{data?.totalCancelOrders || 0}</div>
                        </div>
                    </div>
                </div>
                <div className="dashboard__chart">
                    <ColumnChart data = {data.revenues} />
                </div>
            </div>
            <div className="dashboard__right">
                <div className="dashboard__summary">
                    <div className="summary__item">
                        <FaDollarSign className="summary__icon" />
                        <div className="summary__content">
                            <div className="summary__heading">Doanh thu (VND)</div>
                            <div className="summary__value">{data?.totalRevenue || 0}</div>
                        </div>
                    </div>
                    <div className="summary__item">
                        <FaUsers className="summary__icon" />
                        <div className="summary__content">
                            <div className="summary__heading">Số khách hàng</div>
                            <div className="summary__value">{data?.totalCustomers || 0}</div>
                        </div>
                    </div>
                </div>
                <div className="dashboard__details">
                    <div className="details__item">
                        <FaBoxOpen className="details__icon" />
                        <div className="details__info">
                            <div className="details__heading">Tổng sản phẩm</div>
                            <div className="details__value">{data?.totalProducts || 0}</div>
                        </div>
                    </div>
                    <div className="details__item">
                        <FaListAlt className="details__icon" />
                        <div className="details__info">
                            <div className="details__heading">Tổng danh mục</div>
                            <div className="details__value">{data?.totalCategories || 0}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
