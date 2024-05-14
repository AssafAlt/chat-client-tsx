import { Avatar, Flex, Text } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import React from "react";
import classes from "./MobileUsers.module.css";
import { DisplayType, useDisplay } from "../../../hooks/useDisplay";
import { createPrivateRoomName } from "../../../utils/socketUtils";
import { ICurrentRoom } from "../../../context/DisplayContext";

interface IMobileUserRowProps {
  nickname: string;
  profileImg: string;
  isConnected: boolean;
  userNick: string;
}
const MobileUserRow: React.FC<IMobileUserRowProps> = ({
  nickname,
  profileImg,
  isConnected,
  userNick,
}) => {
  const { chooseOverlayImage, displayManager, chooseChat } = useDisplay();
  const onClickRow = () => {
    displayManager(DisplayType.CHAT);
    const newRoom: ICurrentRoom = {
      currentFriendNickname: nickname,
      currentFriendProfileImg: profileImg,
      currentRoom: createPrivateRoomName(userNick, nickname),
    };
    chooseChat(newRoom);
  };
  return (
    <Flex justify="space-between" py="sm" px="sm">
      <Avatar src={profileImg} onClick={() => chooseOverlayImage(profileImg)} />
      <Text ff="sans-serif" fs="italic" onClick={onClickRow}>
        {nickname + "..."}
      </Text>
      <Flex>
        <IconCircleFilled
          className={classes.circleIcon}
          style={{ color: isConnected ? "#1beb00" : "#f90101" }}
        />
      </Flex>
    </Flex>
  );
};

export default MobileUserRow;
