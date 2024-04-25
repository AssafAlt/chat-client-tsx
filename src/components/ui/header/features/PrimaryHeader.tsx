import React from "react";
import { Flex, Text } from "@mantine/core";
import classes from "../Header.module.css";

const PrimaryHeader = () => {
  return (
    <nav className={classes.primaryHeader}>
      <Flex>
        <Text fw={700} c="cyan" style={{ marginRight: 8, fontSize: 30 }}>
          Capitan
        </Text>
        <Text fw={700} style={{ color: "#0f7c8b", fontSize: 30 }}>
          ChatApp
        </Text>
      </Flex>
    </nav>
  );
};

export default PrimaryHeader;
