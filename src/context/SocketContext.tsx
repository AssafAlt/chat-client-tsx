import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { Client } from "stompjs";
import { FriendWithStatus } from "../models/FriendWithStatus";

interface SocketState {
  stompClient: Client | null;
  connectedFriends: FriendWithStatus[];
  connectionError: boolean;
  //connect: () => void;
  //disconnect: () => void;
  /*subscribe: (
    destination: string,
    callback: (message: unknown) => void
  ) => Subscription;*/
}

type SocketAction =
  | { type: "CONNECTION_SUCCESS"; payload: Client }
  | { type: "CONNECTION_FAILED" }
  | { type: "GET_CONNECTED_FRIENDS"; payload: FriendWithStatus[] }
  | { type: "NO_CONNECTED_FRIENDS" }
  | { type: "FRIEND_CONNECTED"; payload: FriendWithStatus }
  | { type: "FRIEND_DISCONNECTED"; payload: { nickname: string } };

const initialState: SocketState = {
  stompClient: null,
  connectedFriends: [],
  connectionError: false,
  //connect: () => {},
  //disconnect: () => {},
};

const SocketContext = createContext<
  | {
      socketState: SocketState;
      socketDispatch: Dispatch<SocketAction>;
    }
  | undefined
>(undefined);

const socketReducer = (
  state: SocketState,
  action: SocketAction
): SocketState => {
  switch (action.type) {
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        stompClient: action.payload,
      };
    case "CONNECTION_FAILED":
      return {
        ...state,
        connectionError: true,
      };
    case "FRIEND_CONNECTED":
      return {
        ...state,
        connectedFriends: [...state.connectedFriends, action.payload],
      };
    case "GET_CONNECTED_FRIENDS":
      return {
        ...state,
        connectedFriends: action.payload,
      };
    case "NO_CONNECTED_FRIENDS":
      return {
        ...state,
      };
    case "FRIEND_DISCONNECTED":
      return {
        ...state,
        connectedFriends: state.connectedFriends.filter(
          (friend) => friend.nickname !== action.payload.nickname
        ),
      };

    default:
      return state;
  }
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socketState, socketDispatch] = useReducer(socketReducer, initialState);

  return (
    <SocketContext.Provider value={{ socketState, socketDispatch }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
