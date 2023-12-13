import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { LoginResponse } from "../models/UserResponses";

// Define the SignUp Actions
type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: LoginResponse }
  | { type: "LOGOUT" };
/* | { type: "START" }
  | { type: "SIGNUP_SUCCESS"; payload: string }
  | { type: "SIGNUP_FAILURE"; payload: string }*/

interface AuthState {
  nickname: string;
  profileImg: string;
}

// Create the initial state
const initialState: AuthState = {
  nickname: "",
  profileImg: "",
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
    case "LOGIN_SUCCESS":
      return {
        profileImg: action.payload.imagePath,
        nickname: action.payload.userNickname,
      };

    case "LOGOUT":
      return {
        ...state,
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
