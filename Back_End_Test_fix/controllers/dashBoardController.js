const { Product, Category, BgImage, Order } = require("../model/model");
const mongoose = require("mongoose");
const moment = require("moment");

const dashBoardController = {
    getEcommerceDB: async (req, res) => {
        try {
            const now = moment();
            const startOfWeek = now.clone().startOf("isoWeek");
            const startOf30Days = now.clone().subtract(30, "days");

            // Tổng số đơn hàng trong tuần
            const OrdersInWeek = await Order.countDocuments({
                createdAt: { $gte: startOfWeek.toDate(), $lte: now.toDate() },
            });
            const newOrdersInWeek = await Order.countDocuments({
                statusOrder: "CXN",
                createdAt: { $gte: startOfWeek.toDate(), $lte: now.toDate() },
            });

            // Tổng số đơn hàng bị hủy trong tuần
            const canceledOrdersInWeek = await Order.countDocuments({
                statusOrder: "DH",
                createdAt: { $gte: startOfWeek.toDate(), $lte: now.toDate() },
            });

            // Số đơn hàng hoàn thành trong tuần
            const completedOrdersInWeek = await Order.countDocuments({
                statusOrder: "HT",
                createdAt: { $gte: startOfWeek.toDate(), $lte: now.toDate() },
            });

            // Số đơn hàng đang được xử lý
            const processingOrders = await Order.countDocuments({ statusOrder: "DG" });

            // Mảng ngày trong 7 ngày và 30 ngày
            const last7Days = Array.from({ length: 7 }, (_, i) =>
                now.clone().subtract(i, "days").format("YYYY-MM-DD")
            ).reverse();

            const last30Days = Array.from({ length: 30 }, (_, i) =>
                now.clone().subtract(i, "days").format("YYYY-MM-DD")
            ).reverse();

            // Mảng trung bình số lượng sản phẩm của đơn hàng trong 7 ngày
            const avgProductsPerDayLast7Days = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: now.clone().subtract(7, "days").toDate(), $lte: now.toDate() },
                    },
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        avgQuantity: { $avg: { $sum: "$listItem.quantity" } },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            // Mảng trung bình tổng tiền của các đơn hàng trong 7 ngày
            const avgTotalPerDayLast7Days = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: now.clone().subtract(7, "days").toDate(), $lte: now.toDate() },
                    },
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        avgTotal: { $avg: "$total" },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            // Mảng tổng doanh thu từng ngày trong 30 ngày
            const dailyRevenueLast30Days = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startOf30Days.toDate(), $lte: now.toDate() },
                        statusOrder: "HT",
                    },
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        totalRevenue: { $sum: "$total" },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            // Hàm điền giá trị mặc định cho mảng ngày
            const fillMissingDates = (dateArray, dataArray, key) => {
                const dataMap = dataArray.reduce((acc, curr) => {
                    acc[curr._id] = curr[key];
                    return acc;
                }, {});

                return dateArray.map(date => ({
                    date,
                    [key]: dataMap[date] || 0,
                }));
            };

            // Hàm làm tròn số thập phân 1 chữ số
            const roundToOneDecimal = (value) => {
                return Math.round(value * 10) / 10;
            };

            // Áp dụng hàm điền giá trị mặc định và làm tròn số
            const avgProductsPerDayFilled = fillMissingDates(last7Days, avgProductsPerDayLast7Days, "avgQuantity").map(item => ({
                ...item,
                avgQuantity: roundToOneDecimal(item.avgQuantity),
            }));

            const avgTotalPerDayFilled = fillMissingDates(last7Days, avgTotalPerDayLast7Days, "avgTotal").map(item => ({
                ...item,
                avgTotal: roundToOneDecimal(item.avgTotal),
            }));

            const dailyRevenueFilled = fillMissingDates(last30Days, dailyRevenueLast30Days, "totalRevenue").map(item => ({
                ...item,
                totalRevenue: roundToOneDecimal(item.totalRevenue),
            }));
            const topSellingProducts = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: now.clone().subtract(7, "days").toDate(), $lte: now.toDate() },
                    },
                },
                { $unwind: "$listItem" },
                {
                    $group: {
                        _id: "$listItem.productId",
                        totalSold: { $sum: "$listItem.quantity" },
                    },
                },
                { $sort: { totalSold: -1 } },
                { $limit: 5 },
                {
                    $lookup: {
                        from: "products", // Tên collection của sản phẩm
                        localField: "_id",
                        foreignField: "_id",
                        as: "productDetails",
                    },
                },
            ]);

            // Top 3 sản phẩm có doanh thu cao nhất
            const topRevenueProducts = await Order.aggregate([
                { $unwind: "$listItem" },
                {
                    $group: {
                        _id: "$listItem.productId",
                        totalRevenue: { $sum: { $multiply: ["$listItem.quantity", "$listItem.price"] } },
                    },
                },
                { $sort: { totalRevenue: -1 } },
                { $limit: 3 },
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "_id",
                        as: "productDetails",
                    },
                },
            ]);

            // Kết quả trả về cho client
            res.status(200).json({
                EC: 0,
                MS: "Get Ecommerce Dashboard data successfully!",
                data: {
                    orderRatios: {
                        OrdersInWeek,
                        newOrdersInWeek,
                        canceledOrdersInWeek,
                        completedOrdersInWeek,
                        processingOrders,
                    },
                    avgProductsPerDayLast7Days: avgProductsPerDayFilled,
                    avgTotalPerDayLast7Days: avgTotalPerDayFilled,
                    dailyRevenueLast30Days: dailyRevenueFilled,
                    topSellingProducts: topSellingProducts,
                    topRevenueProducts: topRevenueProducts,
                },
            });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Get Ecommerce Dashboard error!", err });
        }
    },
};

module.exports = dashBoardController;
