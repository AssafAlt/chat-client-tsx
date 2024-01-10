import { springApi, imagesApi } from "../api/apiConfig";
import { axiosErrorExtractor } from "../utils/axiosErrorUtils";
import { UpdateProfileImageResponse } from "../models/UserResponses";
import { useUserContext } from "../context/UserContext";
import { useAuthContext } from "../context/AuthContext";

export const useImages = () => {
  const { state } = useAuthContext();
  const { dispatch } = useUserContext();
  const uploadProfileImage = async (profileImage: FormData) => {
    dispatch({ type: "START" });

    try {
      const res = await imagesApi.post("/upload", profileImage);

      if (res.status === 200) {
        await console.log(res);
        const response = await springApi.patch("users/setting/image", {
          imagePath: res.data.url,
        });
        if (response.status === 200) {
          const data: UpdateProfileImageResponse = await response.data;

          const updatedDetails = {
            userNickname: state.nickname,
            firstLogin: data.firstLogin,
            imagePath: data.imagePath,
          };
          localStorage.setItem("currentUser", JSON.stringify(updatedDetails));
          dispatch({ type: "UPDATE_FIRST_LOGIN_SUCCESS" });
        } else {
          dispatch({
            type: "UPDATE_FIRST_LOGIN_FAILED",
            payload: "Failed to update the url in the server!",
          });
        }
      } else {
        dispatch({
          type: "UPDATE_FIRST_LOGIN_FAILED",
          payload: "Failed to upload image to cloudinary!",
        });
      }
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);
      console.log(err);
      throw new Error(err);
    }
  };

  return { uploadProfileImage };
};
