import { Bar } from 'react-chartjs-2'; // Sử dụng Bar thay vì Line
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const db = (props) => {
    const dataChart = props.data;
    if (!dataChart || !dataChart.avgTotalPerDayLast7Days) {
        return <div>Đang tải dữ liệu...</div>;
    }
    const Labels = dataChart.avgTotalPerDayLast7Days.map(entry => {
        const [year, month, day] = entry.date.split("-");  // Tách năm, tháng, ngày
        return `${month}-${day}`;  // Chỉ lấy tháng và ngày, định dạng "MM-DD"
    });
    const Data = dataChart.avgTotalPerDayLast7Days.map(entry => entry.avgTotal);

    const data = {
        labels: Labels,
        datasets: [
            {
                label: 'Tổng doanh thu trung bình',
                data: Data,
                backgroundColor: '#00d9e48f', // Màu nền của cột
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Biểu đồ Doanh thu',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.raw.toLocaleString(); // Định dạng lại giá trị tooltip
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false, // Tắt lưới của trục x
                },
            },
            y: {
                grid: {
                    display: true, // Tắt lưới của trục y
                },
            },
        },
    };

    return <Bar data={data} options={options} />; // Sử dụng Bar thay vì Line
};

export default db;


