import { springApi } from "../api/apiConfig";
import { axiosErrorExtractor } from "../utils/axiosErrorUtils";

export const useFriends = () => {
  const searchUser = async (searchedUser: string) => {
    try {
      const res = await springApi.get(`users/search?prefix=${searchedUser}`);

      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Unknown error");
      }
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const getFriends = async () => {
    try {
      const res = await springApi.get("users/friends");

      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Unknown error");
      }
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const sendFriendRequest = async (recieverId: number) => {
    try {
      const res = await springApi.post("friend-requests/add", {
        recieverId: recieverId,
      });

      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Unknown error");
      }
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const getFriendRequests = async () => {
    try {
      const res = await springApi.get("friend-requests/get-requests");

      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Unknown error");
      }
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const confirmFriendRequest = async (friendRequestId: number) => {
    try {
      const res = await springApi.patch("friend-requests/confirm", {
        friendRequestId: friendRequestId,
      });

      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Unknown error");
      }
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  const cancelFriendRequest = async (friendRequestId: number) => {
    try {
      const res = await springApi.delete("friend-requests/cancel", {
        data: {
          friendRequestId: friendRequestId,
        },
      });

      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Unknown error");
      }
    } catch (error: unknown) {
      const err = axiosErrorExtractor(error);

      throw new Error(err);
    }
  };
  return {
    searchUser,
    getFriends,
    sendFriendRequest,
    getFriendRequests,
    confirmFriendRequest,
    cancelFriendRequest,
  };
};
