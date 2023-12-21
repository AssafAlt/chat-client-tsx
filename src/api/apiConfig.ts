import axios from "axios";

export const springApi = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

export const imagesApi = axios.create({
  baseURL: "https://api.Cloudinary.com/v1_1/do9flnwgi/image/",
});
