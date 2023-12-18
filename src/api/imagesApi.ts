import axios from "axios";
import { ProfileImageClo } from "../models/ProfileImageClo";
import { imageResponse } from "../models/ImagesResponse";
const imagesApi = axios.create({
  baseURL: "https://api.Cloudinary.com/v1_1/do9flnwgi/image/upload",
});

const defaultImg =
  "http://res.cloudinary.com/do9flnwgi/image/upload/v1702645974/chat_profiles/h36jgq8rmfusrrnc1dmn.jpg";

export const uploadProfileImageAPI = async (payload: ProfileImageClo) => {
  try {
    if (payload.isFileExists() === false) {
      return { error: true, imageUrl: defaultImg } as imageResponse;
    }
    const res = await imagesApi.post("/", payload);

    if (!res) {
      return { error: true, imageUrl: defaultImg } as imageResponse;
    } else {
      return { error: false, imageUrl: res.data.url } as imageResponse;
    }
  } catch (error) {
    console.log(error);
    return { error: true, imageUrl: defaultImg } as imageResponse;
  }
};
