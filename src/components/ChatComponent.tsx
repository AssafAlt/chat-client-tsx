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
  action: string;
  timestamp: Date | null;
}

const ChatComponent: React.FC = () => {
  const token = Cookies.get("jwt_token") || "";
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws", {
      headers: { Cookie: `jwt_token=${token}` },
    });
    const stomp = Stomp.over(socket) as Client;

    stomp.connect({ token: token }, () => {
      setStompClient(stomp);
      console.log("Connected");
    });

    return () => {
      if (stomp.connected) {
        stomp.disconnect(() => {});
        console.log("Disconnected");
      }
    };
  }, [token]);

  /*useEffect(() => {
    if (stompClient && user) {
      const subscription = stompClient.subscribe(
        `/user/${user.id}/topic/users`,
        (message) => {
          console.log(message);
          const userList: User[] = JSON.parse(message.body);
          setConnectedUsers(userList);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, user]);*/

  const sendMessages = () => {
    if (stompClient && user) {
      const message: Message = {
        user: user,
        receiverId: null,
        comment: inputMessage,
        action: "JOIN",
        timestamp: null,
      };
      stompClient.send("/app/message", {}, JSON.stringify(message));
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
      stompClient.send("/app/privatemessage", {}, JSON.stringify(message));
    }
  };

  /*const sendMessages = () => {
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
  };*/

  return (
    <div>
      <h2>Connected Users</h2>
      <ul>
        {/*connectedUsers.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))*/}
      </ul>
    </div>
  );
};

export default ChatComponent;
/*const url = "ws://localhost:8080/spring-boot-tutorial";
const userUrl = "/topic/users";
const topicUrl = "/topic/messages";
const privateTopicUrl = "/topic/privatemessages";
const privatePreUrl = "/user/";
const appUsers = "/app/user";
const appMessages = "/app/message";
const appPrivateMessages = "/app/privatemessage";
const client = new StompJs.Client({
  brokerURL: url,
});
client.subscribe(privatePreUrl + user.id + userUrl, (usersList) => {
  showUsers(JSON.parse(usersList.body));
});*/
