import React, { createContext, useReducer, useContext, Dispatch } from "react";
import Cookies from "js-cookie";
import { LoginResponse } from "../models/UserResponses";
const currentUserJson = localStorage.getItem("currentUser");
const currentUser: LoginResponse | null = currentUserJson
  ? JSON.parse(currentUserJson)
  : null;
// Define the SignUp Actions
type AuthAction =
  | { type: "START" }
  | { type: "LOGIN_SUCCESS"; payload: LoginResponse }
  | { type: "LOGIN_FAILED"; payload: string }
  | { type: "REGISTER_SUCCESS"; payload: string }
  | { type: "REGISTER_FAILED"; payload: string }
  | { type: "LOGOUT" };

interface AuthState {
  nickname: string | null;
  profileImg: string | null;
  loading: boolean;
  success: boolean;
  message: string;
  isFirstLogin: boolean;
}

// Create the initial state
const initialState: AuthState = {
  nickname: currentUser ? currentUser.userNickname : null,
  profileImg: currentUser ? currentUser.imagePath : null,
  loading: false,
  success: false,
  message: "",
  isFirstLogin: currentUser ? currentUser.firstLogin : true,
};

// Create the SignUpContext
const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

// Create the SignUp reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        loading: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case "REGISTER_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return {
        profileImg: action.payload.imagePath,
        nickname: action.payload.userNickname,
        loading: false,
        success: true,
        message: "",
        isFirstLogin: action.payload.firstLogin,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };

    case "LOGOUT":
      localStorage.removeItem("currentUser");
      Cookies.remove("jwt_token");
      return {
        ...state,
        isFirstLogin: true,
        nickname: null,
        profileImg: null,
      };

    default:
      return state;
  }
};

// Create the SignUpProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to access the SignUp context
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
