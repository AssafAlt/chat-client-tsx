import React, { useState, useEffect } from "react";
import Stomp, { Client, Message } from "stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import { useSocketContext } from "../context/SocketContext";
import { useSocket } from "../hooks/useSocket";

interface User {
  id: string;
  serialId: number;
  username: string;
}

const ChatComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const { socketState } = useSocketContext();
  const { disconnectingSocket } = useSocket();
  const { stompClient } = socketState;
  /*
  useEffect(() => {
    return () => {
      if (socketState.stompClient?.connected) {
        disconnectingSocket();
      }
    };
  }, []);
*/

  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(
        "/user/suson@test.com/queue/onlineFriends",
        (message) => {
          console.log("Received message:", message); // Log the entire message object
          try {
            const userList: string[] = JSON.parse(message.body);
            console.log("Parsed user list:", userList); // Log the parsed user list
            setConnectedUsers(userList);
          } catch (error) {
            console.error("Error parsing message body:", error); // Log parsing errors
          }
        }
      );
    }
  }, [stompClient]);

  return (
    <div>
      <ul>
        {connectedUsers.map((username, index) => (
          <li key={index}>{username}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatComponent;
/* return () => {
        subscription.unsubscribe();
      };*/
