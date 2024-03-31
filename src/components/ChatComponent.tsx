import React, { useState, useEffect } from "react";
import Stomp, { Client, Message } from "stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";

interface User {
  id: string;
  serialId: number;
  username: string;
}

const ChatComponent: React.FC = () => {
  const token = Cookies.get("jwt_token") || "";
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [connectionError, setConnectionError] = useState<boolean>(false);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws", {
      headers: { Cookie: `jwt_token=${token}` },
    });
    const stomp = Stomp.over(socket) as Client;

    stomp.connect(
      { token: token },
      () => {
        setStompClient(stomp);
        console.log("Connected");
        setConnectionError(false); // Reset connection error
      },
      (error) => {
        console.error("Error while connecting:", error);
        setConnectionError(true); // Set connection error flag
      }
    );

    return () => {
      if (stomp.connected) {
        stomp.disconnect(() => {});
        console.log("Disconnected");
      }
    };
  }, [token]);

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

      /* return () => {
        subscription.unsubscribe();
      };*/
    }
  }, [stompClient]);

  return (
    <div>
      {connectionError && (
        <p>
          Connection error. Please check your internet connection and try again.
        </p>
      )}
      <h2>Connected Users</h2>
      <ul>
        {connectedUsers.map((username, index) => (
          <li key={index}>{username}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatComponent;
