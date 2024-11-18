import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TripLineChart = (props) => {
    const dataChart = props.data;
    if (!dataChart || !dataChart.dailyRevenueLast30Days) {
        return <div>Đang tải dữ liệu...</div>;
    }

    // Chuẩn bị dữ liệu
    const Labels = dataChart.dailyRevenueLast30Days.slice(0, 15).map((entry) => {
        const [year, month, day] = entry.date.split("-");
        return `${day}-${month}`; // Định dạng "DD-MM"
    });
    
    // const dataSecondTime = dataChart.dailyRevenueLast30Days.map((entry) => entry.totalRevenue);
    // const dataThirdTime = dataChart.dailyRevenueLast30Days.map((entry) => entry.totalRevenue);
    // const dataFourthTime = dataChart.dailyRevenueLast30Days.map((entry) => entry.totalRevenue);
    const dataSecondTime = [
        4000000, 7900000, 6000000, 7800000, 6000000,
        2000000, 6000000, 4000000, 6000000, 4000000,
        2000000, 7800000, 6000000, 4000000, 2000000
    ];

    const dataThirdTime = [
        6200000, 9000000, 9000000, 7800000, 8400000,
        1700000, 1700000, 1700000, 1700000, 8200000,
        9500000, 8000000, 6000000, 7800000, 3000000
    ];

    const dataFourthTime = [
        5000000, 5000000, 3000000, 6200000, 1800000,
        7000000, 7000000, 2200000, 7000000, 7000000,
        7000000, 4000000, 6000000, 2000000, 9200000
    ];

    const chartData = {
        labels: Labels,
        datasets: [
            {
                label: 'Second time',
                data: dataSecondTime,
                borderColor: 'rgba(75, 192, 192, 1)', // Màu đường
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu nền mờ dưới đường
                fill: true, // Tô nền dưới đường
                borderWidth: 4, // Đặt độ dày nét đường đậm
                borderDash: [], // Không có nét đứt, nét liền
                pointRadius: 3,
                pointHoverRadius: 4,
                pointBackgroundColor: '#ffffff00',
                pointBorderColor: '#ffffff00',
                pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Third time',
                data: dataThirdTime,
                borderColor: 'rgba(54, 162, 235, 1)', // Màu đường
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Màu nền mờ dưới đường
                fill: true,
                borderWidth: 2, // Đặt độ dày nét đường mảnh
                borderDash: [5, 5], // Nét đứt, 5px dài, 5px ngắn
                pointRadius: 3,
                pointHoverRadius: 4,
                pointBackgroundColor: '#ffffff00',
                pointBorderColor: '#ffffff00',
                pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
            },
            {
                label: 'Fourth time',
                data: dataFourthTime,
                borderColor: 'rgba(255, 99, 132, 1)', // Màu đường
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Màu nền mờ dưới đường
                fill: true,
                borderWidth: 1, // Đặt độ dày nét đường mảnh
                borderDash: [10, 5], // Nét đứt, 10px dài, 5px ngắn
                pointRadius: 3,
                pointHoverRadius: 4,
                pointBackgroundColor: '#ffffff00',
                pointBorderColor: '#ffffff00',
                pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };


    // Cấu hình biểu đồ
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Returning Customer Rate',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Ẩn lưới trục X
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return `${value/1000}`; 
                    },
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default TripLineChart;
