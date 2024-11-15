import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { getAllOrders } from "../../../services/apiServices";
import { getDataEcommerce } from "../../../services/apiServices";
import _ from "lodash";
import moment from "moment";
import "./DashBoard.scss";
import SimpleLineChart from "./totalsellDB";
import AvgTotalChart from "./avgTotalChart";


const DashBoard = () => {
    const [orders, setOrders] = useState([]);
    const [data, setData] = useState({});
    const fetchData = async () => {
        let res = await getDataEcommerce();
        if (res.EC === 0) {
            setData(res.data);
            console.log(res.data);
            toast.success(res.MS);
        }
    };
    const fetchListOrders = async () => {
        let res = await getAllOrders();
        if (res.EC === 0) {
            setOrders(res.orders);
            toast.success(res.MS);
        }
    };
    useEffect(() => {
        fetchData();
        fetchListOrders();
    }, []);


    return (
        <div className="DashBoard-container">
            <div className="eco_dashBoard_left">
                <h2>Biểu đồ thống kê doanh thu</h2>
                <div className="statistics_order">
                    <div className="ordernew">{data?.newOrdersInWeek}đơn hàng mới</div>
                    <div className="orderproces">{data?.processingOrders} đơn hàng đang xử lí</div>
                    <div className="ordercancle">{data?.canceledOrdersInWeek} đơn hàng bị hủy</div>

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
                    <SimpleLineChart data={data}/>

                </div>

            </div>
            <div className="eco_dashBoard_right">
                <div className="item_top">
                    <div className="left"><AvgTotalChart data={data}/></div>
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
