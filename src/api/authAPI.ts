import axios from "axios";
import { LoginForm, RegisterForm } from "../models/AuthForms";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth/",
  withCredentials: true,
});

export const loginAPI = async (payload: LoginForm) => {
  const res = await api.post("/login", payload);

  if (!res) {
    throw new Error("User not found!");
  } else {
    return res.data;
  }
};
export const registerAPI = async (payload: RegisterForm) => {
  const res = await api.post<string>("/register", payload);
  if (!res) {
    throw new Error("Error creating user!");
  }
};
