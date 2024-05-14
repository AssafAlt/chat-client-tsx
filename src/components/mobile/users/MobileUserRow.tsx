import { Avatar, Flex, Text } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import React from "react";
import classes from "./MobileUsers.module.css";

interface IMobileUserRowProps {
  nickname: string;
  profileImg: string;
  isConnected: boolean;
}
const MobileUserRow: React.FC<IMobileUserRowProps> = ({
  nickname,
  profileImg,
  isConnected,
}) => {
  return (
    <Flex justify="space-between" py="sm" px="sm">
      <Avatar src={profileImg} />
      <Text ff="sans-serif" fs="italic">
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
