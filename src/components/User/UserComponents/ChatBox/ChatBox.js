import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { FaRegSave } from "react-icons/fa";
import { postCreateUserOrder, postCreatePayment } from "../../../../services/apiServices";
import { getAllProducts, removeProductToCart, getCartbyUserid, changeQuantityOfProductToCart } from "../../../../services/apiServices";
import "./ChatBox.scss";
import { BsSend } from "react-icons/bs";
const ChatBox = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user.account);
    const account = useSelector((state) => state.user.account);
    const userCart = useSelector((state) => state.cart.cartItems);
    const [quantities, setQuantities] = useState({});
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Chào bạn, tôi có thể giúp gì cho bạn?" }
    ]);


    useEffect(() => {
        const initialQuantities = {};
        userCart.forEach((item) => {
            initialQuantities[item.cartDetailId] = item.quantity; // Khởi tạo từ Redux
        });
        setQuantities(initialQuantities); // Cập nhật state
    }, [userCart]);

    const handleSendMessage = () => {
        if (inputMessage.trim() === "") return;

        // Gửi tin nhắn người dùng
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: inputMessage }
        ]);
        setInputMessage("");

        // Mô phỏng phản hồi của bot
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Bot: " + inputMessage }
            ]);
        }, 1000);
    };

    return (

        <div className="chat-container">
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    className="message-input"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Nhập tin nhắn..."
                />
                <div className="send-button" onClick={handleSendMessage}><BsSend /></div>
            </div>
        </div>

    );
};

export default ChatBox;
