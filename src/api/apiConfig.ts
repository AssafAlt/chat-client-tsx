import axios from "axios";

export const springApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API}`,
  withCredentials: true,
});

export const imagesApi = axios.create({
  baseURL: `${import.meta.env.CLOUDINARY_API}`,
});
