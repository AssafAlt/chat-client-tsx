import { useState } from "react";

import { IUsersToggleProps } from "../../../../models/props/UserToggleProps";
import { Flex, List, Avatar, Text } from "@mantine/core";
import { IconBrandHipchat } from "@tabler/icons-react";
import { DisplayType, useDisplay } from "../../../../hooks/useDisplay";
import { ICurrentRoom } from "../../../../context/DisplayContext";
import { createPrivateRoomName } from "../../../../utils/socketUtils";
import { useAuthContext } from "../../../../context/AuthContext";
import classes from "../SideBar.module.css";

const UsersToggle = (props: IUsersToggleProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const listLength = Object.keys(props.friendsList).length;
  const { displayManager, chooseChat } = useDisplay();
  const { state } = useAuthContext();
  const userNick: string = state.nickname ? state.nickname : "";
  return (
    <>
      <div
        data-active={isClicked || undefined}
        className={classes.link}
        onClick={() => {
          setIsClicked(!isClicked);
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.cursor = "pointer";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.cursor = "auto";
        }}
      >
        <props.Icon className={classes.linkIcon} stroke={1.5} />
        <span>
          {props.title} ({listLength})
        </span>
      </div>
      {isClicked && listLength > 0 && (
        <List py="sm">
          {Object.entries(props.friendsList).map(([nickname, profileImg]) => (
            <Flex
              onClick={() => {
                displayManager(DisplayType.CHAT);
                const newRoom: ICurrentRoom = {
                  currentFriendNickname: nickname,
                  currentFriendProfileImg: profileImg,
                  currentRoom: createPrivateRoomName(userNick, nickname),
                };
                chooseChat(newRoom);
              }}
              key={nickname}
              justify="space-between"
              py="sm"
              px="sm"
            >
              <Avatar src={profileImg} />
              <Text ff="sans-serif" fs="italic">
                {nickname}
              </Text>
              <Flex>
                <IconBrandHipchat />
              </Flex>
            </Flex>
          ))}
        </List>
      )}
    </>
  );
};

export default UsersToggle;
