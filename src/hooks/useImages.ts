import { springApi, imagesApi } from "../api/apiConfig";
import { axiosErrorExtractor } from "../utils/axiosErrorUtils";
import { ProfileImageClo } from "../models/ProfileImageClo";
import { UpdateProfileImageResponse } from "../models/UserResponses";
import { useUserContext } from "../context/UserContext";
import { useAuthContext } from "../context/AuthContext";

export const useImages = () => {
  const { state } = useAuthContext();
  const { dispatch } = useUserContext();
  const uploadProfileImage = async (profileImage: ProfileImageClo) => {
    dispatch({ type: "START" });
    try {
      const res = await imagesApi.post("/", profileImage);

      if (res.status === 200) {
        const imagePath = res.data.url;
        const response = await springApi.put(
          "users/setting/update-profile",
          imagePath
        );
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
