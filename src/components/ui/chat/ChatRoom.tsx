import React, { useState } from "react";
import { Avatar, Button, Paper, Textarea, Text } from "@mantine/core";
import ChatHeader from "./features/ChatHeader";

// Sample data for messages
const initialMessages = [
  { id: 1, sender: "John", text: "Hi there!", time: "10:00 AM" },
  { id: 2, sender: "Jane", text: "Hello!", time: "10:05 AM" },
];

const ChatRoom = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleMessageSend = () => {
    if (newMessage.trim() === "") return;

    const newId =
      messages.length > 0 ? messages[messages.length - 1].id + 1 : 1;
    const newMessageObj = {
      id: newId,
      sender: "You", // Assuming the user sending the message is "You"
      text: newMessage.trim(),
      time: getCurrentTime(), // Get current time
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  // Function to get current time
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "max",
        border: "1px solid #ccc",
        borderRadius: "5px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ChatHeader />
      <div style={{ flex: "1", overflowY: "auto", padding: "10px" }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent:
                message.sender === "You" ? "flex-start" : "flex-end", // Align messages based on sender
            }}
          >
            {message.sender === "You" ? (
              <Avatar
                style={{ marginRight: "10px" }}
                radius="xl"
                src="/your-avatar.jpg"
                alt="You"
              />
            ) : (
              <Avatar
                style={{ marginLeft: "10px" }}
                radius="xl"
                src="/avatar.jpg"
                alt={message.sender}
              />
            )}
            <div
              style={{
                backgroundColor:
                  message.sender === "You" ? "#f0f0f0" : "#dcf8c6", // Different background colors for different senders
                padding: "8px 12px",
                borderRadius: "10px",
                textAlign: "left",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                {message.sender}
              </div>
              <div>{message.text}</div>
              <div style={{ fontSize: "12px", color: "#777" }}>
                {message.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "10px",
          borderTop: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Textarea
          style={{ flex: "1", marginRight: "10px" }}
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Type your message here..."
        />
        <Button onClick={handleMessageSend} color="cyan">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatRoom;
