import axios, { AxiosResponse } from "axios";
import { LoginForm, RegisterForm } from "../models/AuthForms";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth/",
  withCredentials: true,
});

export const loginAPI = async (payload: LoginForm) => {
  try {
    const res = await api.post("/login", payload);

    if (!res) {
      throw new Error("User not found!");
    }

    return res;
  } catch (error) {
    console.error("Error during loginAPI:", error);
    throw new Error("Login failed");
  }
};
export const registerAPI = async (payload: RegisterForm) => {
  const res = await api.post("/register", payload);
  if (!res) {
    throw new Error("Error creating user!");
  } else {
    return res.data;
  }
};
