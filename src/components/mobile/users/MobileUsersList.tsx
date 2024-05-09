import { List, ScrollArea } from "@mantine/core";
import React from "react";
import { IFriendsWithStatus } from "../../../models/FriendWithStatus";
import MobileUserRow from "./MobileUserRow";
import { useFriendsContext } from "../../../context/FriendsContext";

interface IMobileUsersListProps {
  friendsList: IFriendsWithStatus;
}
/*onlineFriends: IFriendMap;
  offlineFriends: IFriendMap;*/
const MobileUsersList = () => {
  const { friendsState } = useFriendsContext();
  return (
    <ScrollArea p="sm">
      <List py="sm">
        {Object.entries(friendsState.friends.onlineFriends).map(
          ([nickname, profileImg]) => (
            <MobileUserRow
              key={nickname}
              nickname={nickname}
              profileImg={profileImg}
              isConnected={true}
            />
          )
        )}
        {Object.entries(friendsState.friends.offlineFriends).map(
          ([nickname, profileImg]) => (
            <MobileUserRow
              key={nickname}
              nickname={nickname}
              profileImg={profileImg}
              isConnected={false}
            />
          )
        )}
      </List>
    </ScrollArea>
  );
};

export default MobileUsersList;
