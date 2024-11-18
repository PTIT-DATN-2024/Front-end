import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,ArcElement } from "chart.js";

// Đăng ký các thành phần cần thiết
ChartJS.register(CategoryScale,ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OrderRatiosChart = (props) => {
    const dataChart = props.data;
    if (!dataChart || !dataChart.orderRatios) {
        return <div>Đang tải dữ liệu...</div>;
    }
    // Chuẩn bị dữ liệu
    const labels = [
        "New Orders",
        "Canceled Orders",
        "Completed Orders",
        "Processing Orders",
    ];
    const dataValues = [
        // dataChart.orderRatios.OrdersInWeek,
        dataChart.orderRatios.newOrdersInWeek,
        dataChart.orderRatios.canceledOrdersInWeek,
        dataChart.orderRatios.completedOrdersInWeek,
        dataChart.orderRatios.processingOrders,
    ];

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: [
                    "rgba(75, 192, 192, 0.8)", // Orders In Week
                    "rgba(54, 162, 235, 0.8)", // New Orders
                    "rgba(255, 99, 132, 0.8)", // Canceled Orders
                    "rgba(153, 102, 255, 0.8)", // Completed Orders
                    "rgba(255, 159, 64, 0.8)", // Processing Orders
                ],
                hoverBackgroundColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
            },
        ],
    };

    // Cấu hình biểu đồ
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Order Ratios Overview",
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
    };

    return <Pie data={chartData} options={options} />;
};

export default OrderRatiosChart;
