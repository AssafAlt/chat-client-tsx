import React, { createContext, useReducer, useContext, Dispatch } from "react";

interface DisplayState {
  showChat: boolean;
  showHeaders: boolean;
  overlay: { source: string; isVisible: boolean };
}
// Define the SignUp Actions
type DisplayAction =
  | { type: "SHOW_CHAT" }
  | { type: "SHOW_HEADERS" }
  | { type: "CLOSE_HEADERS" }
  | { type: "SHOW_OVERLAY"; payload: { source: string; isVisible: boolean } }
  | { type: "CLOSE_OVERLAY" };

// Create the initial state
const initialState: DisplayState = {
  showChat: false,
  showHeaders: false,
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
    case "SHOW_CHAT":
      return {
        ...state,
        showChat: true,
        showHeaders: false,
      };
    case "SHOW_HEADERS":
      return { ...state, showChat: false, showHeaders: true };
    case "CLOSE_HEADERS":
      return { ...state, showHeaders: false };
    case "SHOW_OVERLAY":
      return {
        ...state,
        overlay: {
          source: action.payload.source,
          isVisible: action.payload.isVisible,
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
