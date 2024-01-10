import React, { createContext, useReducer, useContext, Dispatch } from "react";

type UserAction =
  | { type: "START" }
  | { type: "UPDATE_IMG_SUCCESS" }
  | { type: "UPDATE_IMG_FAILED"; payload: string }
  | { type: "UPDATE_FIRST_LOGIN_SUCCESS" }
  | { type: "UPDATE_FIRST_LOGIN_FAILED"; payload: string };
interface UserState {
  loading: boolean;
  success: boolean;
  message: string;
}

// Create the initial state
const initialState: UserState = {
  loading: false,
  success: false,
  message: "",
};

// Create the SignUpContext
const UserContext = createContext<
  | {
      state: UserState;
      dispatch: Dispatch<UserAction>;
    }
  | undefined
>(undefined);

// Create the SignUp reducer
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_IMG_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };
    case "UPDATE_IMG_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    case "UPDATE_FIRST_LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };
    case "UPDATE_FIRST_LOGIN_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    default:
      return state;
  }
};

// Create the SignUpProvider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to access the SignUp context
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
