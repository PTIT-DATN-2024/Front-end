import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TotalSellChart = (props) => {
    const dataChart = props.data;

    if (!dataChart || !dataChart.dailyRevenueLast30Days) {
        return <div>Đang tải dữ liệu...</div>;
    }

    const Labels = dataChart.dailyRevenueLast30Days.map(entry => {
        const [year, month, day] = entry.date.split("-");
        return `${month}-${day}`;  // Định dạng "MM-DD"
    });

    const Data = dataChart.dailyRevenueLast30Days.map(entry => entry.totalRevenue);

    const data = {
        labels: Labels,
        datasets: [
            {
                label: 'Tổng doanh thu trung bình',
                data: Data,
                borderColor: '#4A90E2',
                backgroundColor: 'rgba(74, 144, 226, 0.2)',
                fill: true,
                borderWidth: 2,
                pointRadius: 3, // Kích thước điểm mặc định
                pointHoverRadius: 4, // Kích thước điểm khi hover
                pointBackgroundColor: '#ffffff00', // Màu của điểm
                pointBorderColor: '#ffffff00', // Viền của điểm
                pointHoverBackgroundColor: '#0056b3', // Màu của điểm khi hover
                pointHoverBorderColor: '#0056b3', // Viền của điểm khi hover
            },
        ],
    };

    const options = {
        responsive: true,
        animation: {
            duration: 1000, // Thời gian chuyển tiếp khi dữ liệu thay đổi (1 giây)
            easing: 'easeInOutQuad', // Hiệu ứng chuyển tiếp mượt mà
        },
        plugins: {
            legend: {
                display: false, // Ẩn phần chú thích
            },
            title: {
                display: true,
                text: 'Biểu đồ Doanh thu',
            },
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        // Hiển thị ngày tháng trong tooltip
                        const index = tooltipItems[0].dataIndex;
                        return `Ngày: ${Labels[index]}`;
                    },
                    label: function (tooltipItem) {
                        // Hiển thị doanh thu với định dạng VND
                        return `Doanh thu: ${tooltipItem.raw.toLocaleString()} VND`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false, // Ẩn lưới trục X
                },
            },
            y: {
                beginAtZero: true, // Bắt đầu từ 0 trên trục Y
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)', // Màu lưới mờ
                },
                ticks: {
                    callback: function (value) {
                        return value.toLocaleString(); // Định dạng số liệu trên trục Y
                    }
                }
            }
        }
    };

    return <Line data={data} options={options} />;
};

export default TotalSellChart;
