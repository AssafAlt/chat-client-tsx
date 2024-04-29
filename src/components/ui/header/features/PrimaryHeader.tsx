import React from "react";
import { Flex, Text } from "@mantine/core";
import classes from "../Header.module.css";
import { IconBellRinging } from "@tabler/icons-react";

interface IPrimaryHeaderProps {
  isConnected: boolean;
}

const PrimaryHeader: React.FC<IPrimaryHeaderProps> = ({ isConnected }) => {
  return (
    <nav className={classes.primaryHeader}>
      <Flex>
        <Text c="cyan" className={classes.textOne}>
          Capitan
        </Text>
        <Text className={classes.textTwo}>ChatApp</Text>
      </Flex>
      {isConnected && (
        <IconBellRinging className={classes.notificationIcon} color="cyan" />
      )}
    </nav>
  );
};

export default PrimaryHeader;
