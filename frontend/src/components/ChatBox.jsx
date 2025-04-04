import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Kết nối socket
const socket = io("http://localhost:5000");

const ChatBox = () => {
  // Hiển thị/ẩn chat box
  const [showChat, setShowChat] = useState(false);
  // Danh sách user online (không bao gồm chính mình)
  const [usersOnline, setUsersOnline] = useState([]);
  // Người được chọn để chat
  const [selectedUser, setSelectedUser] = useState(null);
  // Danh sách tin nhắn hiển thị
  const [messages, setMessages] = useState([]);
  // Nội dung tin nhắn đang gõ
  const [message, setMessage] = useState("");
  // Tạo user ngẫu nhiên để test
  const [currentUser] = useState("user" + Math.floor(Math.random() * 1000));

  useEffect(() => {
    // Đăng ký user với server khi component mount
    socket.emit("userConnected", currentUser);

    // Lắng nghe danh sách user online
    socket.on("updateUserList", (users) => {
      // Bỏ currentUser khỏi danh sách hiển thị
      setUsersOnline(users.filter((u) => u !== currentUser));
    });

    // Lắng nghe tin nhắn gửi đến (bao gồm gửi cho mình và người khác)
    socket.on("receiveMessage", (msg) => {
      // Chỉ hiển thị nếu tin nhắn liên quan đến người đang chat
      if (
        msg.sender === selectedUser ||
        msg.receiver === selectedUser ||
        (msg.sender === currentUser && msg.receiver === selectedUser)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      socket.off("updateUserList");
      socket.off("receiveMessage");
    };
  }, [currentUser, selectedUser]);

  // Chọn 1 user để chat
  const selectUser = (user) => {
    setSelectedUser(user);
    setMessages([]); // Reset tin nhắn, hoặc load từ DB nếu có
    socket.emit("joinRoom", user);
  };

  // Gửi tin nhắn
  const sendMessage = () => {
    if (message.trim() && selectedUser) {
      const msgData = {
        sender: currentUser,
        receiver: selectedUser,
        content: message,
      };
      // Phát sự kiện lên server
      socket.emit("sendMessage", msgData);
      // Không cần tự thêm tin nhắn vào mảng -> đã có "receiveMessage"
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 group">
      {/* Nút mở/đóng chatbox */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="bg-second text-white p-3 rounded-full shadow-lg hover:bg-second transition"
      >
        💬
      </button>

      {/* Chatbox */}
      {showChat && (
        <div className="absolute bottom-[calc(100%+10px)] right-0 w-[450px] h-[500px] bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col">
          {/* Tiêu đề */}
          <div className="p-3 border-b border-gray-300 flex items-center justify-between">
            <h4 className="text-base font-semibold">Chat Box</h4>
            <span className="text-xs text-gray-500">Bạn: {currentUser}</span>
          </div>

          <div className="flex flex-1">
            {/* Cột bên trái: Danh sách user online */}
            <div className="w-1/3 border-r border-gray-300 p-2 overflow-y-auto">
              <h4 className="font-bold text-sm mb-2">Users Online</h4>
              {usersOnline.length === 0 ? (
                <p className="text-xs text-gray-500">Không có ai online</p>
              ) : (
                usersOnline.map((user) => (
                  <p
                    key={user}
                    onClick={() => selectUser(user)}
                    className={`p-2 text-sm cursor-pointer rounded-md mb-1 transition ${
                      selectedUser === user
                        ? "bg-gray-300"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {user}
                  </p>
                ))
              )}
            </div>

            {/* Cột bên phải: Khung chat */}
            <div className="w-2/3 flex flex-col p-2">
              {/* Tên người đang chat */}
              <h4 className="font-bold text-sm mb-1">
                {selectedUser || "Chọn một người"}
              </h4>

              {/* Danh sách tin nhắn */}
              <div className="flex-1 overflow-y-auto border-b border-gray-300 mb-2 p-2 space-y-2">
                {messages.map((msg, index) => {
                  const isMe = msg.sender === currentUser;
                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-3 py-2 max-w-[70%] ${
                          isMe
                            ? "bg-second text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-xs font-semibold mb-1">
                          {msg.sender}
                        </p>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ô nhập và nút gửi */}
              <div className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Nhập tin nhắn..."
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 bg-second text-black rounded-md px-4 py-2 text-sm hover:bg-second transition"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
