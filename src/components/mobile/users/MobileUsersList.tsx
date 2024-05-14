import { List, Text, ScrollArea } from "@mantine/core";
import MobileUserRow from "./MobileUserRow";
import { useFriendsContext } from "../../../context/FriendsContext";
import classes from "./MobileUsers.module.css";
import { DisplayType, useDisplay } from "../../../hooks/useDisplay";
import { ICurrentRoom } from "../../../context/DisplayContext";
import { useAuthContext } from "../../../context/AuthContext";
import { createPrivateRoomName } from "../../../utils/socketUtils";

const MobileUsersList = () => {
  const { friendsState } = useFriendsContext();
  const { displayManager, chooseChat } = useDisplay();
  const { state } = useAuthContext();
  const userNick: string = state.nickname ? state.nickname : "";
  const onClickRow = (friendNick: string, friendImg: string) => {
    displayManager(DisplayType.CHAT);
    const newRoom: ICurrentRoom = {
      currentFriendNickname: friendNick,
      currentFriendProfileImg: friendImg,
      currentRoom: createPrivateRoomName(userNick, friendNick),
    };
    chooseChat(newRoom);
  };
  return (
    <ScrollArea p="sm" className={classes.usersScroller}>
      <Text pt="md" size="xl" ff="cursive" ta="center">
        Conversations
      </Text>
      <List py="sm">
        {Object.entries(friendsState.friends.onlineFriends).map(
          ([nickname, profileImg]) => (
            <div onClick={() => onClickRow(nickname, profileImg)}>
              <MobileUserRow
                key={nickname}
                nickname={nickname}
                profileImg={profileImg}
                isConnected={true}
              />
            </div>
          )
        )}
        {Object.entries(friendsState.friends.offlineFriends).map(
          ([nickname, profileImg]) => (
            <div onClick={() => onClickRow(nickname, profileImg)}>
              <MobileUserRow
                key={nickname}
                nickname={nickname}
                profileImg={profileImg}
                isConnected={false}
              />
            </div>
          )
        )}
      </List>
    </ScrollArea>
  );
};

export default MobileUsersList;
