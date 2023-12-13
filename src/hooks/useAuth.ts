import { loginAPI } from "../api/authApi";
import { useAuthContext } from "../context/AuthContext";
import { LoginForm } from "../models/AuthForms";

export const useAuth = () => {
  const { dispatch } = useAuthContext();
  const login = async (userCredentials: LoginForm) => {
    const data = await loginAPI(userCredentials);
    if (data) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    }
  };

  return { login };
};
