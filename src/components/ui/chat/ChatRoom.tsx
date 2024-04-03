import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Button, Paper, Textarea, Text } from "@mantine/core";
import ChatHeader from "./features/ChatHeader";
import { useSocketContext } from "../../../context/SocketContext";
import { useAuthContext } from "../../../context/AuthContext";
import { useDisplayContext } from "../../../context/DisplayContext";

// Sample data for messages
const initialMessages = [
  { sender: "John", text: "Hi there!", time: "10:00 AM" },
  { sender: "Jane", text: "Hello!", time: "10:05 AM" },
];

interface CurrentChatMessage {
  sender: string;
  content: string;
  time: string;
}

interface ChatMessage extends CurrentChatMessage {
  room: string;
  recipient: string;
  date: string;
}

const ChatRoom = () => {
  const { state } = useAuthContext();

  const userImage: string = state.profileImg ? state.profileImg : "";
  const userNick: string = state.nickname ? state.nickname : "";
  const { displayState } = useDisplayContext();
  const { currentChat } = displayState;
  const { socketState } = useSocketContext();
  const { stompClient } = socketState;
  const [messages, setMessages] = useState<CurrentChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleMessageSend = () => {
    if (newMessage.trim() === "") return;

    const newChatMessage: ChatMessage = {
      room: currentChat.currentRoom,
      sender: userNick,
      recipient: currentChat.currentFriendNickname,
      content: newMessage.trim(),
      date: getFormatDate(),
      time: getCurrentTime(),
    };

    stompClient?.send(
      "/app/private." + currentChat.currentRoom,
      {},
      JSON.stringify(newChatMessage)
    );
    /*const newMessageObj: CurrentChatMessage = {
      sender: userNick,
      content: newMessage.trim(),
      time: getCurrentTime(),
    };

    setMessages([...messages, newMessageObj]);*/
    setNewMessage("");
  };

  const getFormatDate = (): string => {
    const date = new Date();
    const formattedDate = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    return formattedDate;
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleMessageSend();
    }
  };

  useMemo(() => {
    stompClient?.subscribe(
      "/topic/private." + currentChat.currentRoom,
      (message) => {
        const receivedMessage: CurrentChatMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    );
  }, [stompClient]);

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
      <ChatHeader
        friendNickname={currentChat.currentFriendNickname}
        profileImg={currentChat.currentFriendProfileImg}
      />
      <div style={{ flex: "1", overflowY: "auto", padding: "10px" }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent:
                message.sender === userNick ? "flex-start" : "flex-end", // Align messages based on sender
            }}
          >
            {message.sender === userNick ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  style={{ marginRight: "10px" }}
                  radius="xl"
                  src={userImage}
                  alt="You"
                />
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    textAlign: "left",
                  }}
                >
                  <div>{message.content}</div>
                  <div style={{ fontSize: "12px", color: "#777" }}>
                    {message.time}
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#dcf8c6",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    textAlign: "left",
                    flex: "1",
                  }}
                >
                  <div>{message.content}</div>
                  <div style={{ fontSize: "12px", color: "#777" }}>
                    {message.time}
                  </div>
                </div>
                <Avatar
                  style={{ marginLeft: "10px" }}
                  radius="xl"
                  src={currentChat.currentFriendProfileImg}
                  alt={message.sender}
                />
              </div>
            )}
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
          onKeyDown={handleEnterPress}
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
