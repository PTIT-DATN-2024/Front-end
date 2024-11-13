import React, { useState, useEffect, useMemo } from "react";
import { Table } from "antd";
import { Line, Bar, Pie } from "react-chartjs-2"; // Sử dụng chart.js để vẽ biểu đồ
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { toast } from "react-toastify";
import { getAllOrders } from "../../../services/apiServices";
import _ from "lodash";
import moment from "moment";
import "./DashBoard.scss";

// Đăng ký các thành phần cần thiết của chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashBoard = () => {
    const [orders, setOrders] = useState([]);
    const fetchListOrders = async () => {
        let res = await getAllOrders();
        if (res.EC === 0) {
            setOrders(res.orders);
            toast.success(res.MS);
        }
    };
    useEffect(() => {
        fetchListOrders();
    }, []);


    return (
        <div className="DashBoard-container">
            <div className="eco_dashBoard_left">
                <h2>Biểu đồ thống kê doanh thu</h2>
                <div className="statistics_order">
                    <div className="ordernew">57 new orders</div>
                    <div className="orderproces">5 orders đang xử lí</div>
                    <div className="ordercancle">15 order bị hủy</div>

                </div>
                <div className="total_sell_selection">
                    <div className="heading">

                        <div className="header">Total sells</div>
                        <div className="desc">Payment received across all channels</div>
                    </div>
                    <div className="selectBox">
                        Mar 1 - 31, 2022
                    </div>

                </div>
                <div className="total_sell_chart">
                    chart
                </div>

            </div>
            <div className="eco_dashBoard_right">
                <div className="item_top">
                    <div className="left">Số lượng order trong 7 ngày </div>
                    <div className="right">Số lượng khách hàng mới trong 7 ngày </div>
                </div>
                <div className="item_bottom">
                    <div className="left">top sản phẩm bán chạy trong tuần </div>
                    <div className="right">tỉ lệ hoàn thành đơn hàng</div>
                </div>


            </div>


        </div>
    );
};

export default DashBoard;
