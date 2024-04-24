import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Textarea,
  Text,
  ScrollArea,
  Affix,
  ActionIcon,
  Loader,
} from "@mantine/core";
import ChatHeader from "./features/ChatHeader";
import { useSocketContext } from "../../../context/SocketContext";
import { useAuthContext } from "../../../context/AuthContext";
import { useDisplayContext } from "../../../context/DisplayContext";
import {
  IChatMessage,
  ICurrentChatMessage,
} from "../../../models/ChatMessages";
import { springApi } from "../../../api/apiConfig";
import { IconArrowDown } from "@tabler/icons-react";
import classes from "./ChatRoom.module.css";

interface IConversation {
  [key: string]: ICurrentChatMessage[];
}

interface IConverSationResponse {
  totalPages: number;
  currentPage: number;
  messagesByDate: IConversation;
  hasNext: boolean;
}

const ChatRoom = () => {
  const { state } = useAuthContext();
  const viewport = useRef<HTMLDivElement>(null);
  const effectRan = useRef(false);
  const userImage: string = state.profileImg ? state.profileImg : "";
  const userNick: string = state.nickname ? state.nickname : "";
  const { displayState } = useDisplayContext();
  const { currentChat } = displayState;
  const { socketState } = useSocketContext();
  const { stompClient } = socketState;
  const [chatConversation, setChatConversation] = useState<IConversation>({});
  const [newMessage, setNewMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const hasMoreMessages = useRef(true);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    viewport.current!.scrollTo({
      top: viewport.current!.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleScrollToTop = () => {
    const container = viewport.current!;
    if (container.scrollTop === 0 && hasMoreMessages.current) {
      getChatHistory(pageNumber + 1);
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

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
    scrollToBottom();
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

  const getChatHistory = async (pageNum: number) => {
    setIsLoading(true);
    if (!hasMoreMessages.current) {
      return;
    }
    try {
      const res = await springApi.get(`messages/${currentChat.currentRoom}`, {
        params: { pageNumber: pageNum },
      });

      const data: IConverSationResponse = res.data;
      console.log(data);
      hasMoreMessages.current = data.hasNext;

      setChatConversation((prevChatHistory) => {
        const updatedChatHistory = { ...prevChatHistory };

        Object.entries(data.messagesByDate).forEach(([date, messages]) => {
          if (updatedChatHistory[date]) {
            updatedChatHistory[date] = [
              ...updatedChatHistory[date],
              ...messages,
            ];
          } else {
            updatedChatHistory[date] = messages;
          }
        });

        return updatedChatHistory;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useMemo(() => {
    stompClient?.subscribe(
      "/topic/private." + currentChat.currentRoom,
      (message) => {
        const receivedMessage: ICurrentChatMessage = JSON.parse(message.body);
        setChatConversation((prevChatHistory) => {
          if (prevChatHistory[receivedMessage.date]) {
            return {
              ...prevChatHistory,
              [receivedMessage.date]: [
                receivedMessage,
                ...prevChatHistory[receivedMessage.date],
              ],
            };
          } else {
            return {
              [receivedMessage.date]: [receivedMessage],
              ...prevChatHistory,
            };
          }
        });
      }
    );
  }, [currentChat.currentRoom, stompClient]);

  useEffect(
    () => {
      if (effectRan.current === false) {
        getChatHistory(pageNumber);
        scrollToBottom();
      }

      return () => {
        console.log("unmounted");
        effectRan.current = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(
    () => {
      const container = viewport.current!;
      container.addEventListener("scroll", handleScrollToTop);
      return () => {
        container.removeEventListener("scroll", handleScrollToTop);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className={classes.chatWindow}>
      <ChatHeader
        friendNickname={currentChat.currentFriendNickname}
        profileImg={currentChat.currentFriendProfileImg}
      />

      <ScrollArea p="sm" h={300} viewportRef={viewport}>
        {isLoading && <Loader size={30} />}
        {Object.entries(chatConversation)
          .slice()
          .reverse()
          .map(([date, messages]) => (
            <div key={date}>
              <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                {date}
              </div>
              {messages
                .slice()
                .reverse()
                .map((message, index) => (
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
                ))}
            </div>
          ))}
        <Affix position={{ bottom: 120, right: 50 }} onClick={scrollToBottom}>
          <ActionIcon color="cyan" radius="xl" size={60}>
            <IconArrowDown stroke={1.5} size={30} />
          </ActionIcon>
        </Affix>
      </ScrollArea>

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
