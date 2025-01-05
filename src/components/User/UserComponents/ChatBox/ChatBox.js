import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import "./ChatBox.scss";
import { useSelector } from "react-redux";
import { getAllMessage } from "../../../../services/apiServices";
import * as StompJs from "@stomp/stompjs";
import { toast } from "react-toastify";
const ChatBox = () => {
    const chatBoxId = useSelector((state) => state.user.account.chatboxId);
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([
        { sender: "staff", text: "Chào bạn, tôi có thể giúp gì cho bạn?" }
    ]);
    const [isConnected, setIsConnected] = useState(false);

    // WebSocket và STOMP client
    const socket = useRef(null);
    const stompClient = useRef(null);
    // Fetch all chatboxes
    const fetchAllMessage = async () => {
        try {
            const response = await getAllMessage(chatBoxId);
            if (response.EC === 0) {
                setMessages(response.messages.map(msg => ({
                    sender: msg.by === "CUSTOMER" ? "customer" : "staff",
                    text: msg.message,
                    timestamp: msg.timestamp
                })));
            }
        } catch (error) {
            toast.error("Failed to fetch chat messages.");
        }
    };

    useEffect(() => {
        if (chatBoxId) {
            fetchAllMessage(); // Lấy tin nhắn khi mở chatbox
        }
    }, [chatBoxId]);
    useEffect(() => {
        if (!chatBoxId) return;

        // Khởi tạo WebSocket và STOMP client
        socket.current = new WebSocket("ws://localhost:8080/chat-box");
        stompClient.current = new StompJs.Client({
            webSocketFactory: () => socket.current,
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        // Cấu hình sự kiện kết nối và lỗi
        stompClient.current.onConnect = () => {
            console.log("STOMP client đã kết nối");
            setIsConnected(true);

            stompClient.current.subscribe(`/notification/customer/${chatBoxId}`, (response) => {
                const payload = JSON.parse(response.body);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "staff", text: payload.message },
                ]);
            });
        };

        stompClient.current.onStompError = (frame) => {
            console.error("Lỗi STOMP:", frame.headers["message"]);
        };

        stompClient.current.onDisconnect = () => {
            console.log("STOMP client đã ngắt kết nối");
            setIsConnected(false);
        };

        stompClient.current.activate();


        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
            console.log("STOMP client đã ngắt kết nối");
        };
    }, [chatBoxId]);

    const sendMessage = () => {
        if (inputMessage.trim() === "" || !chatBoxId) {
            console.error("Không thể gửi tin nhắn trống hoặc chatBoxId chưa được xác định.");
            return;
        }

        if (!stompClient.current || !stompClient.current.active) {
            console.error("STOMP client chưa kết nối.");
            return;
        }

        const message = { message: inputMessage };

        stompClient.current.publish({
            destination: `/publish/staff/${chatBoxId}`,
            body: JSON.stringify(message),
        });

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "customer", text: inputMessage },
        ]);

        setInputMessage("");
    };

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === "customer" ? "my-message" : "received-message"}`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    className="message-input"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                    placeholder="Nhập tin nhắn..."
                    disabled={!isConnected}
                />
                <button
                    className="send-button"
                    onClick={sendMessage}
                    disabled={!isConnected || inputMessage.trim() === ""}
                >
                    <BsSend />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
