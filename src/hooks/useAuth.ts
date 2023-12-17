import api from "../api/apiConfig";

import { useAuthContext } from "../context/AuthContext";
import { LoginForm, RegisterForm } from "../models/AuthForms";
import { LoginResponse } from "../models/UserResponses";

export const useAuth = () => {
  const { dispatch } = useAuthContext();

  const login = async (userCredentials: LoginForm) => {
    dispatch({ type: "START" });

    try {
      const res = await api.post("auth/login", userCredentials);

      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data as LoginResponse });
      } else {
        dispatch({ type: "LOGIN_FAILED", payload: res.data });
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch({ type: "LOGIN_FAILED", payload: "Unknown error" });
    }
  };

  const register = async (newUser: RegisterForm) => {
    dispatch({ type: "START" });
    try {
      const res = await api.post("auth/register", newUser);
      if (res.status === 200) {
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: res.data,
        });
      } else {
        dispatch({
          type: "REGISTER_FAILED",
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILED",
        payload: "Unknown error",
      });
    }
  };
  const logout = async () => {
    dispatch({ type: "START" });
    try {
      await api.post("auth/logout");
      dispatch({
        type: "LOGOUT",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { login, register, logout };
};
