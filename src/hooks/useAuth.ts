import { loginAPI, registerAPI } from "../api/authApi";
import { useAuthContext } from "../context/AuthContext";
import { LoginForm, RegisterForm } from "../models/AuthForms";
import { LoginResponse } from "../models/UserResponses";

export const useAuth = () => {
  const { state, dispatch } = useAuthContext();

  const login = async (userCredentials: LoginForm) => {
    dispatch({ type: "START" });
    const res = await loginAPI(userCredentials);
    if (res.status === 200) {
      console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data as LoginResponse });
    } else {
      console.log(res.data);
      dispatch({ type: "LOGIN_FAILED", payload: res.data });
    }
  };

  const register = async (newUser: RegisterForm) => {
    dispatch({ type: "START" });
    const data = await registerAPI(newUser);
    if (data.ok) {
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: "Registered successfully",
      });
    } else {
      dispatch({
        type: "REGISTER_FAILED",
        payload: data,
      });
    }
  };

  return { login, register, state };
};
