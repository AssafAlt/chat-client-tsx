import React from "react";
import { Flex, Text } from "@mantine/core";
import classes from "./PrimaryHeader.module.css";
import { IconBellRinging } from "@tabler/icons-react";
import MobileDropMenu from "../../../mobile/dropmenu/MobileDropMenu";

/*
interface IPrimaryHeaderProps {
  isConnected: boolean;
}
: React.FC<IPrimaryHeaderProps> = ({ isConnected })*/

const PrimaryHeader = () => {
  return (
    <nav className={classes.primaryHeader}>
      <Flex>
        <Text c="cyan" className={classes.textOne}>
          Capitan
        </Text>
        <Text className={classes.textTwo}>ChatApp</Text>
      </Flex>
      {/*isConnected && <MobileDropMenu />*/}
    </nav>
  );
};

export default PrimaryHeader;
