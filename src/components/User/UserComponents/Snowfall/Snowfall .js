import React, { useEffect } from "react";
import "./Snowfall.scss";

const Snowfall = () => {
    useEffect(() => {
        // Hàm này sẽ tạo ra mỗi bông tuyết
        const createSnowflake = () => {
            // Tạo một thẻ div mới cho bông tuyết
            const snowflake = document.createElement("div");

            // Thêm lớp CSS cho bông tuyết
            snowflake.classList.add("snowflake");

            // Thêm biểu tượng tuyết vào bông tuyết
            snowflake.innerText = "❄";

            // Thiết lập vị trí ngang ngẫu nhiên (theo tỷ lệ chiều rộng của viewport)
            snowflake.style.left = Math.random() * 100 + "vw"; // `vw` là đơn vị tỷ lệ theo chiều rộng của màn hình

            // Thiết lập kích thước ngẫu nhiên cho bông tuyết (từ 5px đến 15px)
            snowflake.style.fontSize = Math.random() * 10 + 5 + "px"; // Kích thước ngẫu nhiên từ 5px đến 15px

            // Thiết lập thời gian animation ngẫu nhiên cho bông tuyết (từ 2s đến 5s)
            snowflake.style.animationDuration = Math.random() * 3 + 2 + "s"; // Thời gian rơi từ 2 đến 5 giây

            // Thiết lập độ trễ animation ngẫu nhiên (từ 0s đến 2s)
            snowflake.style.animationDelay = Math.random() * 2 + "s"; // Độ trễ ngẫu nhiên

            // Thêm bông tuyết vào body của trang
            document.body.appendChild(snowflake);

            // Xóa bông tuyết sau khi animation kết thúc (5s tương ứng với thời gian animation max)
            setTimeout(() => {
                snowflake.remove(); // Xóa bông tuyết khỏi DOM
            }, 5000); // 5000ms = 5 giây (đồng bộ với thời gian animation)
        };

        // Tạo bông tuyết liên tục mỗi 150ms (tạo ra 6 bông tuyết mỗi giây)
        const interval = setInterval(createSnowflake, 150); // Số lần gọi `createSnowflake`

        // Cleanup (dọn dẹp) khi component unmount (khi component không còn trên DOM)
        return () => clearInterval(interval); // Hủy bỏ interval khi component bị hủy
    }, []); // Chỉ chạy một lần khi component mount

    return null; // Component này không cần render bất kỳ JSX nào
};

export default Snowfall;
