import { useState, useEffect } from "react";
import {
  Text,
  Group,
  Code,
  TextInput,
  rem,
  Paper,
  Flex,
  List,
  Avatar,
} from "@mantine/core";
import {
  IconBellRinging,
  IconSwitchHorizontal,
  IconLogout,
  IconUsers,
  IconBrandHipchat,
} from "@tabler/icons-react";

import classes from "./SideBar.module.css";
import { useSocketContext } from "../../../context/SocketContext";
import { FriendWithStatus } from "../../../models/FriendWithStatus";

const SideBar = () => {
  const { socketState } = useSocketContext();
  const [friendLists, setFriendsList] = useState<FriendWithStatus[]>([]);
  const [active, setActive] = useState("Notifications");
  const [showCard, setShowCard] = useState("");

  const handleTabChange = (value: string) => {
    if (value !== "") {
      setShowCard("");
    }
    if (value === "Online Friends") {
      setShowCard("Online Friends");
    }
  };

  useEffect(() => {
    setFriendsList(socketState.connectedFriends);
  }, [socketState]);

  const data = [
    { link: "", label: "Notifications", icon: IconBellRinging, variance: "0" },
    {
      link: "",
      label: "Online Friends",
      icon: IconUsers,
      variance: friendLists.length.toString(),
    },
  ];

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        handleTabChange(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
      <span>({item.variance})</span>
    </a>
  ));

  return (
    <Paper className={classes.navbar} bg="cyan">
      <div className={classes.navbarMain}>
        <TextInput
          placeholder="Search"
          size="xs"
          leftSection={
            <IconBellRinging
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          }
          rightSectionWidth={70}
          rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
          styles={{ section: { pointerEvents: "none" } }}
          mb="sm"
        />
        <Group className={classes.header} justify="space-between">
          <Code fw={700} className={classes.version}>
            v3.1.2
          </Code>
        </Group>
        {links}
      </div>
      {showCard === "Online Friends" && friendLists.length > 0 && (
        <List py="sm">
          {friendLists.map((friend, index) => (
            <Flex key={index} justify="space-between" py="sm" px="sm">
              <Avatar src={friend.profileImg} />
              <Text ff="sans-serif" fs="italic">
                {friend.nickname}
              </Text>
              <Flex>
                <IconBrandHipchat />
              </Flex>
            </Flex>
          ))}
        </List>
      )}{" "}
      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </Paper>
  );
};

export default SideBar;
