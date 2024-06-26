import React, { createContext, useReducer, useContext, Dispatch } from "react";

export interface ICurrentRoom {
  currentRoom: string;
  currentFriendProfileImg: string;
  currentFriendNickname: string;
}

interface DisplayState {
  showChat: boolean;
  showSettings: boolean;
  currentChat: ICurrentRoom;
  showHeaders: boolean;
  showMobileTab: string;
  overlay: { source: string; isVisible: boolean };
}
// Define the SignUp Actions
type DisplayAction =
  | { type: "CLOSE_CHAT" }
  | { type: "CHOOSE_CHAT"; payload: ICurrentRoom }
  | { type: "SHOW_SETTINGS" }
  | { type: "CLOSE_SETTINGS" }
  | { type: "SHOW_MOBILE_TAB"; payload: string }
  | { type: "SHOW_HEADERS" }
  | { type: "CLOSE_HEADERS" }
  | { type: "SHOW_OVERLAY"; payload: string }
  | { type: "CLOSE_OVERLAY" }
  | { type: "DEFAULT_DISPLAY" };

// Create the initial state
const initialState: DisplayState = {
  showChat: false,
  showSettings: false,
  showMobileTab: "Chats",
  currentChat: {
    currentRoom: "",
    currentFriendProfileImg: "",
    currentFriendNickname: "",
  },
  showHeaders: true,
  overlay: { source: "", isVisible: false },
};

// Create the SignUpContext
const DisplayContext = createContext<
  | {
      displayState: DisplayState;
      displayDispatch: Dispatch<DisplayAction>;
    }
  | undefined
>(undefined);

const displayReducer = (
  state: DisplayState,
  action: DisplayAction
): DisplayState => {
  switch (action.type) {
    case "CHOOSE_CHAT":
      return {
        ...state,
        showChat: true,
        showSettings: false,
        currentChat: action.payload,
        showHeaders: false,
      };
    case "CLOSE_CHAT":
      return {
        ...state,
        currentChat: {
          currentRoom: "",
          currentFriendProfileImg: "",
          currentFriendNickname: "",
        },
        showChat: false,
      };
    case "SHOW_SETTINGS":
      return {
        ...state,
        showChat: false,
        showSettings: true,
        showHeaders: false,
        showMobileTab: "Settings",
      };
    case "CLOSE_SETTINGS":
      return {
        ...state,
        showSettings: false,
        showMobileTab: "",
      };
    case "SHOW_MOBILE_TAB":
      return { ...state, showMobileTab: action.payload };

    case "SHOW_HEADERS":
      return {
        ...state,
        showChat: false,
        showHeaders: true,
        showSettings: false,
      };
    case "CLOSE_HEADERS":
      return { ...state, showHeaders: false };
    case "SHOW_OVERLAY":
      return {
        ...state,
        overlay: {
          source: action.payload,
          isVisible: true,
        },
      };
    case "CLOSE_OVERLAY":
      return {
        ...state,
        overlay: {
          source: "",
          isVisible: false,
        },
      };
    case "DEFAULT_DISPLAY":
      return {
        showMobileTab: "Chats",
        showChat: false,
        showSettings: false,
        currentChat: {
          currentRoom: "",
          currentFriendProfileImg: "",
          currentFriendNickname: "",
        },
        showHeaders: false,
        overlay: { source: "", isVisible: false },
      };

    default:
      return state;
  }
};

// Create the SignUpProvider component
export const DisplayProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [displayState, displayDispatch] = useReducer(
    displayReducer,
    initialState
  );

  return (
    <DisplayContext.Provider value={{ displayState, displayDispatch }}>
      {children}
    </DisplayContext.Provider>
  );
};

// Create a custom hook to access the SignUp context
export const useDisplayContext = () => {
  const context = useContext(DisplayContext);

  if (context === undefined) {
    throw new Error("useDisplay must be used within a DisplayProvider");
  }

  return context;
};
