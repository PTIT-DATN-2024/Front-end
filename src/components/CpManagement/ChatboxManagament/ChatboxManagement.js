import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { getAllChatbox, getChatboxInProcess, getAllMessage } from "../../../services/apiServices";
import { useSelector } from "react-redux";
import * as StompJs from "@stomp/stompjs";
import { BsSend } from "react-icons/bs";
import "./ChatboxManagement.scss";

const ChatboxManagement = () => {
    const [listPendingChatbox, setListPendingChatbox] = useState([]); // Khởi tạo là mảng rỗng
    const [listInProgressChatbox, setListInProgressChatbox] = useState([]); // Khởi tạo là mảng rỗng
    const [activeChatboxes, setActiveChatboxes] = useState([]); // Khởi tạo là mảng rỗng

    const account = useSelector((state) => state.user.account);
    const socket = useRef({});
    const stompClient = useRef({});
    const [activeInput, setActiveInput] = useState(null);

    // Lấy danh sách "PENDING" chatbox
    const fetchAllChatBox = async () => {
        try {
            const res = await getAllChatbox();
            if (res.EC === 0) {
                const pendingTasks = res.tasks.filter((task) => task.status === "PENDING");
                setListPendingChatbox(pendingTasks);
            } else {
                toast.error("Không thể lấy danh sách chatbox.");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi lấy danh sách chatbox.");
        }
    };

    // Lấy danh sách "IN PROGRESS" chatbox
    const fetchInProgressChatBox = async () => {
        try {
            const res = await getChatboxInProcess(account.id);
            if (res.EC === 0) {
                setListInProgressChatbox(res.tasks);
            } else {
                toast.error("Không thể lấy danh sách 'IN PROGRESS'.");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi lấy danh sách 'IN PROGRESS'.");
        }
    };

    const handleFocus = (chatboxId) => {
        setActiveInput(chatboxId); // Track the active chatbox being typed in
    };

    useEffect(() => {
        fetchAllChatBox();
        fetchInProgressChatBox();

        // Cấu hình WebSocket chung để lắng nghe các sự thay đổi chatbox
        socket.current = new WebSocket(`ws://localhost:8080/chat-box`);
        stompClient.current = new StompJs.Client({
            webSocketFactory: () => socket.current,
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.current.onConnect = () => {
            stompClient.current.subscribe('/notification/update-ice-box', function (response) {
                // Khi có sự thay đổi, gọi lại các API để cập nhật danh sách chatbox
                fetchAllChatBox();
                fetchInProgressChatBox();
            });
        };

        stompClient.current.activate();

        // Cleanup WebSocket connection when the component is unmounted
        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
        };

    }, []);

    // Cấu hình WebSocket cho mỗi chatbox
    const setupWebSocket = (chatboxId) => {
        if (!stompClient.current[chatboxId]) {
            socket.current[chatboxId] = new WebSocket(`ws://localhost:8080/chat-box`);
            stompClient.current[chatboxId] = new StompJs.Client({
                webSocketFactory: () => socket.current[chatboxId],
                debug: (str) => console.log(str),
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });

            stompClient.current[chatboxId].onConnect = () => {
                stompClient.current[chatboxId].subscribe(`/notification/staff/${chatboxId}`, (response) => {
                    const payload = JSON.parse(response.body);
                    setActiveChatboxes((prevChatboxes) =>
                        prevChatboxes.map((chatbox) =>
                            chatbox.chatBoxId === chatboxId
                                ? {
                                    ...chatbox,
                                    messages: [
                                        ...chatbox.messages,
                                        { sender: "customer", text: payload.message },
                                    ],
                                }
                                : chatbox
                        )
                    );
                });
            };

            stompClient.current[chatboxId].activate();
        }
    };

    // Xử lý khi chọn một chatbox
    const handleSelectChatbox = async (chatbox) => {
        if (activeChatboxes.some((active) => active.chatBoxId === chatbox.chatBoxId)) {
            return; // Chatbox đã được mở
        }
        // Cấu hình WebSocket cho chatbox này
        setupWebSocket(chatbox.chatBoxId);
        try {
            const response = await getAllMessage(chatbox.chatBoxId);
            if (response.EC === 0) {
                const messages = response.messages.map((msg) => ({
                    sender: msg.by === "CUSTOMER" ? "customer" : "staff",
                    text: msg.message,
                    timestamp: msg.timestamp,
                }));

                setActiveChatboxes((prevChatboxes) => [
                    ...prevChatboxes,
                    { ...chatbox, messages },
                ]);
            }
        } catch (error) {
            toast.error("Không thể lấy tin nhắn của chatbox.");
        }
        if (chatbox.status === "PENDING") {
            // Tạo một tin nhắn tự động với nội dung là account.id
            const message = { message: account.id };
            console.log(account.id);
            // Kiểm tra xem WebSocket đã được thiết lập cho chatbox này chưa
            if (stompClient.current[chatbox.chatBoxId]) {
                // Nếu đã thiết lập WebSocket, gửi tin nhắn
                stompClient.current[chatbox.chatBoxId].publish({
                    destination: `/publish/customer/${chatbox.chatBoxId}`,
                    body: JSON.stringify(message),
                });
            } else {
                console.error("WebSocket chưa được kết nối cho chatbox này.");
            }
        }
    };

    const sendMessage = (chatboxId, inputMessage) => {
        if (inputMessage.trim() === "" || !stompClient.current[chatboxId]) {
            console.error("Không thể gửi tin nhắn rỗng hoặc STOMP chưa kết nối.");
            return;
        }
        const message = { message: inputMessage };
        stompClient.current[chatboxId].publish({
            destination: `/publish/customer/${chatboxId}`,
            body: JSON.stringify(message),
        });

        setActiveChatboxes((prevChatboxes) =>
            prevChatboxes.map((chatbox) =>
                chatbox.chatBoxId === chatboxId
                    ? {
                        ...chatbox,
                        messages: [...chatbox.messages, { sender: "staff", text: inputMessage }],
                    }
                    : chatbox
            )
        );
    };

    return (
        <div className="ChatBox_Container">
            <h2>Khách hàng đang chờ tư vấn</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên khách hàng</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listPendingChatbox.map((chatbox, index) => (
                        <tr key={chatbox.chatBoxId}>
                            <td>{index + 1}</td>
                            <td>{chatbox.customer.fullName}</td>
                            <td>{chatbox.customer.email}</td>
                            <td>{chatbox.customer.phone}</td>
                            <td>
                                <Button
                                    variant="success"
                                    onClick={() => handleSelectChatbox(chatbox)}
                                >
                                    Start
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h2>Khách hàng đang tư vấn</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên khách hàng</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listInProgressChatbox.map((chatbox, index) => (
                        <tr key={chatbox.chatBoxId}>
                            <td>{index + 1}</td>
                            <td>{chatbox.customer.fullName}</td>
                            <td>{chatbox.customer.email}</td>
                            <td>{chatbox.customer.phone}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => handleSelectChatbox(chatbox)}
                                >
                                    Continue
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="active-chatboxes">
                {activeChatboxes.map((chatbox) => (
                    <div key={chatbox.chatBoxId} className={`chatbox-inProcess ${activeInput === chatbox.chatBoxId ? "active-chatbox-inProcess" : ""
                        }`}>
                        <span className="close-chatbox-btn">
                            Khách hàng: {chatbox.customer.fullName}
                            <span
                                onClick={() =>
                                    setActiveChatboxes((prev) =>
                                        prev.filter((active) => active.chatBoxId !== chatbox.chatBoxId)
                                    )
                                }
                            >
                                X
                            </span>
                        </span>
                        <div className="chat-container">
                            <div className="messages-container">
                                {chatbox.messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`message ${msg.sender === "staff" ? "my-message" : "received-message"}`}
                                    >
                                        {msg.text}
                                    </div>
                                ))}
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    className="message-input"
                                    placeholder="Nhập tin nhắn..."
                                    onFocus={() => handleFocus(chatbox.chatBoxId)}
                                    onBlur={() => setActiveInput(null)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            sendMessage(chatbox.chatBoxId, e.target.value);
                                            e.target.value = ""; // Xóa input sau khi gửi
                                        }
                                    }}
                                />
                                <button
                                    className="send-button"
                                    onClick={(e) => {
                                        const input = e.currentTarget.parentElement.querySelector(".message-input");
                                        if (input) {
                                            sendMessage(chatbox.chatBoxId, input.value);
                                            input.value = ""; // Xóa input sau khi gửi
                                        }
                                    }}
                                >
                                    <BsSend />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatboxManagement;
