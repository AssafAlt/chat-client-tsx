import api from "../api/apiConfig";
import Cookies from "js-cookie";
import { useAuthContext } from "../context/AuthContext";
import { LoginForm, RegisterForm } from "../models/AuthForms";
import { LoginResponse } from "../models/UserResponses";
import { axiosErrorExtractor } from "../utils/axiosErrorUtils";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (userCredentials: LoginForm) => {
    dispatch({ type: "START" });

    try {
      const res = await api.post("auth/login", userCredentials);

      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data as LoginResponse });
        notifications.show({
          title: "Welcome Back to Capitan's Chat App",
          message: "Navigating to Home page",
          autoClose: 2000,
        });
        navigate("/home");
      } else {
        dispatch({
          type: "LOGIN_FAILED",
          payload: "Unknown error please try again",
        });
      }
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);
      dispatch({ type: "LOGIN_FAILED", payload: err });
      notifications.show({
        title: "Login failed!",
        message: "Please check your credentials or try again later",
        color: "red",
      });
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
        notifications.show({
          title: "Welcome to Capitan's Chat App",
          message: "Navigating to sign in",
        });
        navigate("/");
      } else {
        dispatch({
          type: "REGISTER_FAILED",
          payload: "Unknown error please try again",
        });
      }
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);
      dispatch({
        type: "REGISTER_FAILED",
        payload: err,
      });
      notifications.show({
        title: "Register failed!",
        message: "Please try again later",
        color: "red",
      });
    }
  };
  const logout = async () => {
    dispatch({ type: "START" });
    try {
      Cookies.remove("jwt_token");
      await api.post("auth/logout");
      dispatch({
        type: "LOGOUT",
      });
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);
      console.log(err);
    }
  };

  return { login, register, logout };
};
