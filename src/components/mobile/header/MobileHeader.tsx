import React from "react";
import { Flex, Text } from "@mantine/core";
import classes from "./MobileHeader.module.css";
import MobileDropMenu from "./features/MobileDropMenu";
const MobileHeader = () => {
  return (
    <nav className={classes.mobileNav}>
      <Flex>
        <Text size="xl" fw={700} c="cyan" style={{ marginRight: 8 }}>
          Capitan
        </Text>
        <Text size="xl" fw={700} style={{ color: "#0f7c8b" }}>
          ChatApp
        </Text>
      </Flex>
      <MobileDropMenu />
    </nav>
  );
};

export default MobileHeader;
