import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import { useSocketContext } from "../context/SocketContext";
import Stomp, { Client } from "stompjs";
import { useAuthContext } from "../context/AuthContext";
import {
  FriendWithStatus,
  IFriendStatusUpdate,
  MessageType,
} from "../models/FriendWithStatus";

export const useSocket = () => {
  const { socketState, socketDispatch } = useSocketContext();
  const { state } = useAuthContext();
  const userNick: string = state.nickname ? state.nickname : "";
  const token = Cookies.get("jwt_token") || "";

  const updateConnectedFriends = (newUserUpdate: IFriendStatusUpdate) => {
    if (newUserUpdate.messageType === MessageType.JOIN) {
      const newFriendConnected = new FriendWithStatus(
        newUserUpdate.profileImg,
        newUserUpdate.nickname
      );
      socketDispatch({ type: "FRIEND_CONNECTED", payload: newFriendConnected });
    } else if (newUserUpdate.messageType === MessageType.LEAVE) {
      socketDispatch({
        type: "FRIEND_DISCONNECTED",
        payload: { nickname: newUserUpdate.nickname },
      });
    }
  };

  const connectingSocket = () => {
    try {
      const socket = new SockJS("http://localhost:8080/ws", {
        headers: { Cookie: `jwt_token=${token}` },
      });
      const stomp = Stomp.over(socket) as Client;
      //Ensure the subscribe activates after connection
      const connectCallback = () => {
        stomp.subscribe(`/user/${userNick}/queue/onlineFriends`, (message) => {
          try {
            const newUpdate: IFriendStatusUpdate = JSON.parse(message.body);
            updateConnectedFriends(newUpdate);
            console.log("Parsed user list:", newUpdate);
          } catch (error) {
            console.error("Error parsing message body:", error);
          }
        });
      };
      const errorCallback = (error: unknown) => {
        console.error("Error during WebSocket connection:", error);
      };

      stomp.connect({}, connectCallback, errorCallback);
      socketDispatch({ type: "CONNECTION_SUCCESS", payload: stomp });
    } catch (error: unknown) {
      socketDispatch({ type: "CONNECTION_FAILED" });
      throw new Error("error!!!!!");
    }
  };

  const disconnectingSocket = () => {
    try {
      if (socketState.stompClient) {
        socketState.stompClient.disconnect(() => {});
        console.log("Disconnected");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return { connectingSocket, disconnectingSocket };
};
