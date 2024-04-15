import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { IFriendsWithStatus } from "../models/FriendWithStatus";

interface FriendsState {
  friends: IFriendsWithStatus;
}

type FriendsAction =
  | { type: "GET_FRIENDS_STATUS"; payload: IFriendsWithStatus }
  | { type: "NO_FRIENDS" }
  | { type: "FRIEND_CONNECTED"; payload: string }
  | { type: "FRIEND_DISCONNECTED"; payload: string };

const initialState: FriendsState = {
  friends: { onlineFriends: {}, offlineFriends: {} },
};

const FriendsContext = createContext<
  | {
      friendsState: FriendsState;
      friendsDispatch: Dispatch<FriendsAction>;
    }
  | undefined
>(undefined);

const friendsReducer = (
  state: FriendsState,
  action: FriendsAction
): FriendsState => {
  switch (action.type) {
    case "FRIEND_CONNECTED": {
      const { [action.payload]: friendToRemove, ...remainingOfflineFriends } =
        state.friends.offlineFriends;
      const updatedOnlineFriends = {
        ...state.friends.onlineFriends,
        [action.payload]: friendToRemove,
      };
      return {
        friends: {
          onlineFriends: updatedOnlineFriends,
          offlineFriends: remainingOfflineFriends,
        },
      };
    }
    case "GET_FRIENDS_STATUS":
      return {
        friends: action.payload,
      };
    case "NO_FRIENDS":
      return {
        ...state,
      };
    case "FRIEND_DISCONNECTED": {
      const { [action.payload]: friendToRemove, ...remainingOnlineFriends } =
        state.friends.onlineFriends;
      const updatedOfflineFriends = {
        ...state.friends.offlineFriends,
        [action.payload]: friendToRemove,
      };
      return {
        friends: {
          onlineFriends: remainingOnlineFriends,
          offlineFriends: updatedOfflineFriends,
        },
      };
    }

    default:
      return state;
  }
};

export const FriendsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [friendsState, friendsDispatch] = useReducer(
    friendsReducer,
    initialState
  );

  return (
    <FriendsContext.Provider value={{ friendsState, friendsDispatch }}>
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriendsContext = () => {
  const context = useContext(FriendsContext);

  if (context === undefined) {
    throw new Error("useFriendsContext must be used within a UserProvider");
  }

  return context;
};
