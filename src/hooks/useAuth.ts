import api from "../api/apiConfig";
import { useAuthContext } from "../context/AuthContext";
import { LoginForm, RegisterForm } from "../models/AuthForms";
import { LoginResponse } from "../models/UserResponses";
import { axiosErrorExtractor } from "../utils/axiosErrorUtils";

export const useAuth = () => {
  const { dispatch } = useAuthContext();

  const login = async (userCredentials: LoginForm) => {
    dispatch({ type: "START" });

    try {
      const res = await api.post("auth/login", userCredentials);

      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data as LoginResponse });
      } else {
        dispatch({
          type: "LOGIN_FAILED",
          payload: "Unknown error please try again",
        });
        throw new Error("Unknown error");
      }
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);
      dispatch({ type: "LOGIN_FAILED", payload: err });
      throw new Error(err);
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
          payload: "Unknown error please try again",
        });
        throw new Error("Unknown error");
      }
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);
      dispatch({
        type: "REGISTER_FAILED",
        payload: err,
      });
      throw new Error(err);
    }
  };
  const logout = async () => {
    dispatch({
      type: "LOGOUT",
    });
    try {
      await api.post("auth/logout");
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);
      console.log(err);
    }
  };

  return { login, register, logout };
};
