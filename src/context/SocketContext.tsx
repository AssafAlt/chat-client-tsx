import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { Client } from "stompjs";

interface SocketState {
  stompClient: Client | null;
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
  | { type: "CONNECTION_FAILED" };

const initialState: SocketState = {
  stompClient: null,
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
