import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Button, Paper, Textarea, Text } from "@mantine/core";
import ChatHeader from "./features/ChatHeader";
import { useSocketContext } from "../../../context/SocketContext";
import { useAuthContext } from "../../../context/AuthContext";
import { useDisplayContext } from "../../../context/DisplayContext";
import {
  IChatMessage,
  ICurrentChatMessage,
} from "../../../models/ChatMessages";
import { springApi } from "../../../api/apiConfig";

const ChatRoom = () => {
  const { state } = useAuthContext();

  const userImage: string = state.profileImg ? state.profileImg : "";
  const userNick: string = state.nickname ? state.nickname : "";
  const { displayState } = useDisplayContext();
  const { currentChat } = displayState;
  const { socketState } = useSocketContext();
  const { stompClient } = socketState;
  const [messages, setMessages] = useState<ICurrentChatMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<{
    [key: string]: ICurrentChatMessage[];
  }>({});
  const [newMessage, setNewMessage] = useState("");

  const handleMessageSend = () => {
    if (newMessage.trim() === "") return;

    const newChatMessage: IChatMessage = {
      sender: userNick,
      content: newMessage.trim(),
      time: getCurrentTime(),
      date: getFormatDate(),
      room: currentChat.currentRoom,
      recipient: currentChat.currentFriendNickname,
    };

    stompClient?.send(
      "/app/private." + currentChat.currentRoom,
      {},
      JSON.stringify(newChatMessage)
    );

    setNewMessage("");
  };

  const getFormatDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Ensure two digits
    const day = ("0" + date.getDate()).slice(-2);
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleEnterPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleMessageSend();
    }
  };

  useMemo(() => {
    stompClient?.subscribe(
      "/topic/private." + currentChat.currentRoom,
      (message) => {
        const receivedMessage: ICurrentChatMessage = JSON.parse(message.body);

        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    );
  }, [stompClient]);

  useEffect(
    () => {
      const chatHistory = async () => {
        const res = await springApi.get(`messages/${currentChat.currentRoom}`);
        if (res.status === 200) {
          setChatHistory(res.data);
        }
        if (res.status === 206) {
          setChatHistory(res.data);
          console.log("There is no more messages");
        }
      };
      chatHistory();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
        {Object.entries(chatHistory).map(([date, messages]) => (
          <div key={date}>
            <div style={{ marginBottom: "10px", fontSize: "18px" }}>{date}</div>
            {messages
              .slice()
              .reverse()
              .map(
                (
                  message,
                  index // Reverse the order here
                ) => (
                  <div key={`history-${index}`}>
                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent:
                          message.sender === userNick
                            ? "flex-start"
                            : "flex-end", // Align messages based on sender
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
                  </div>
                )
              )}
          </div>
        ))}
        {messages.map((message, index) => (
          <div key={`new-${index}`}>
            <div
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
