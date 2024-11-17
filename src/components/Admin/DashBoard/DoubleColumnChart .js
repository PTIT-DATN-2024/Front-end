import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DoubleColumnChart = (props) => {
    const dataChart = props.data;
    if (!dataChart || !dataChart.dailyRevenueLast30Days || !dataChart.dailyRevenueLast30Days) {
        return <div>Đang tải dữ liệu...</div>;
    }

    const Labels = dataChart.dailyRevenueLast30Days.map(entry => {
        const [year, month, day] = entry.date.split("-");
        return `${day}-${month}`;  // Định dạng "MM-DD"
    });
    const Data1 = dataChart.dailyRevenueLast30Days.map(entry => entry.totalRevenue);
    const Data2 = dataChart.dailyRevenueLast30Days.map(entry => entry.totalRevenue);

    const data = {
        labels: Labels,
        datasets: [
            {
                label: 'Tháng này',
                data: Data1,
                backgroundColor: 'rgba(56, 116, 255, 0.8)', // Màu cột dữ liệu 1
                borderColor: '#3874FF',
                borderWidth: 1,
            },
            {
                label: 'Tháng trước',
                data: Data2,
                backgroundColor: 'rgba(74, 144, 226, 0.5)', // Màu cột dữ liệu 2
                borderColor: '#4A90E2',
                borderWidth: 1,
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
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'So sánh doanh thu 2 tháng',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()} VND`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Ẩn lưới dọc
                },
                categoryPercentage: 0.8, // Tỷ lệ không gian giữa các nhóm
                barPercentage: 0.7, // Tỷ lệ không gian giữa các cột trong nhóms
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value.toLocaleString(); // Format số trên trục Y
                    },
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)', // Lưới ngang mờ
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default DoubleColumnChart;
