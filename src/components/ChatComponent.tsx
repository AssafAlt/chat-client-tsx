import React, { useState, useEffect } from "react";
import Stomp, { Client } from "stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";

interface User {
  id: string;
  serialId: number;
  username: string;
}

interface Message {
  user: User;
  receiverId: number | null;
  comment: string;
  action: string; // Modify to match backend MessageType enum
  timestamp: Date | null;
}

const ChatComponent: React.FC = () => {
  const token = Cookies.get("jwt_token") || "";
  const [stompClient, setStompClient] = useState<unknown>(null); // Use 'any' type for simplicity, you can replace it with proper types
  const [user, setUser] = useState<User | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws", {
      headers: { Cookie: `jwt_token=${token}` },
    });
    const stomp = Stomp.over(socket);

    stomp.connect({}, () => {
      setStompClient(stomp);
      console.log("Connected");
    });

    return () => {
      if (stomp.connected) {
        stomp.disconnect(() => {});
        console.log("Disconnected");
      }
    };
  }, []);

  const sendMessages = () => {
    if (stompClient && user) {
      const message: Message = {
        user: user,
        receiverId: null,
        comment: inputMessage,
        action: "JOIN",
        timestamp: null,
      };
      stompClient &&
        (stompClient as Client).send("/app/user", {}, JSON.stringify(message));
    }
  };

  const sendPrivateMessages = (receiverId: number) => {
    if (stompClient && user) {
      const message: Message = {
        user: user,
        receiverId: receiverId,
        comment: inputMessage,
        action: "PRIVATE_MESSAGE",
        timestamp: null,
      };
      stompClient &&
        (stompClient as Client).send(
          "/app/privatemessage",
          {},
          JSON.stringify(message)
        );
    }
  };

  return <div>{/* Your chat component JSX */}</div>;
};

export default ChatComponent;
