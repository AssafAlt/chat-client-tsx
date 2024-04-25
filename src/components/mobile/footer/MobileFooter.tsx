import { Button, Flex, Text } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandHipchat,
  IconFriends,
  IconUserQuestion,
  IconCirclePlus,
} from "@tabler/icons-react";
import classes from "./MobileFooter.module.css";
import { useState } from "react";

const MobileFooter = () => {
  const [active, setActive] = useState("Chats");
  return (
    <footer className={classes.footer}>
      <Flex w="25%" direction="column" align="center">
        <IconBrandHipchat
          className={`${classes.iconButton} ${
            active === "Chats" ? classes.clicked : ""
          }`}
          onClick={() => setActive("Chats")}
        />
        <Text
          className={`${classes.text} ${
            active === "Chats" ? classes.clicked : ""
          }`}
        >
          Chats
        </Text>
      </Flex>
      <Flex w="25%" direction="column" align="center">
        <IconFriends
          className={`${classes.iconButton} ${
            active === "Friends" ? classes.clicked : ""
          }`}
          onClick={() => setActive("Friends")}
        />
        <Text
          className={`${classes.text} ${
            active === "Friends" ? classes.clicked : ""
          }`}
        >
          Friends
        </Text>
      </Flex>
      <Flex w="25%" direction="column" align="center">
        <IconUserQuestion
          className={`${classes.iconButton} ${
            active === "Pending" ? classes.clicked : ""
          }`}
          onClick={() => setActive("Pending")}
        />
        <Text
          className={`${classes.text} ${
            active === "Pending" ? classes.clicked : ""
          }`}
        >
          Pending (0)
        </Text>
      </Flex>
      <Flex w="25%" direction="column" align="center">
        <IconCirclePlus
          className={`${classes.iconButton} ${
            active === "Add" ? classes.clicked : ""
          }`}
          onClick={() => setActive("Add")}
        />
        <Text
          className={`${classes.text} ${
            active === "Add" ? classes.clicked : ""
          }`}
        >
          Add Friend
        </Text>
      </Flex>
    </footer>
  );
};

export default MobileFooter;
