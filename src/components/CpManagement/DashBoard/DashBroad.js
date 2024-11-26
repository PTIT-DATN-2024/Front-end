import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { getAllOrders } from "../../../services/apiServices";
import { getDataEcommerce } from "../../../services/apiServices";
import _ from "lodash";
import moment from "moment";
import "./DashBoard.scss";
import TotalSellChart from "./totalsellDB";
import AvgTotalChart from "./avgTotalChart";
import DoubleColumnChart from "./DoubleColumnChart ";
import TripLineChart from "./TripLineChart";
import OrderRatiosChart from "./OrderRatiosChart";
import { FaStar } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
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
        window.scrollTo(0, 0);

    }, []);
    useEffect(() => {
        fetchData();
        fetchListOrders();
    }, []);


    return (
        <>
            <div className="DashBoard-container">
                <div className="eco_dashBoard_left">
                    <h2>Biểu đồ thống kê doanh thu</h2>
                    <div className="statistics_order">
                        <div className=" item ordernew">
                            <FaStar className="icon" />
                            <div className="content">
                                <div className="heading">{data?.orderRatios?.newOrdersInWeek} đơn hàng mới</div>
                                <div className="desc">Đang chờ xác nhận</div>
                            </div>
                        </div>
                        <div className=" item orderproces">
                            <FaPause className="icon" />
                            <div className="content">
                                <div className="heading">{data?.orderRatios?.processingOrders} đơn hàng</div>
                                <div className="desc">Đang giao</div>
                            </div>
                        </div>
                        <div className=" item ordercancle">
                            <IoIosClose className="icon" />
                            <div className="content">
                                <div className="heading">{data?.orderRatios?.canceledOrdersInWeek} đơn hàng</div>
                                <div className="desc">Đã hủy</div>
                            </div>
                        </div>


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
                        <TotalSellChart data={data} />

                    </div>

                </div>
                <div className="eco_dashBoard_right">
                    <div className="item_top">
                        <div className="left"><AvgTotalChart data={data} /></div>
                        <div className="right"><DoubleColumnChart data={data} /></div>
                    </div>
                    <div className="item_bottom">
                        <div className="left"><TripLineChart data={data} /></div>
                        <div className="right"><OrderRatiosChart data={data} /></div>
                    </div>


                </div>


            </div>
            <div className="listChart">
                <div className="itemChart">
                    <DoubleColumnChart data={data} />
                </div>
                <div className="itemChart">
                    <TripLineChart data={data} />

                </div>
                <div className="itemChart">
                    <OrderRatiosChart data={data} />

                </div>


            </div>
        </>
    );
};

export default DashBoard;
