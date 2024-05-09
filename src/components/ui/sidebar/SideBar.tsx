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
  Menu,
  Button,
  ScrollArea,
  Container,
} from "@mantine/core";
import {
  IconBellRinging,
  IconUsers,
  IconBrandHipchat,
  IconFriends,
  IconUserOff,
} from "@tabler/icons-react";

import classes from "./SideBar.module.css";
import { useSocketContext } from "../../../context/SocketContext";
import {
  IFriendMap,
  IFriendsWithStatus,
} from "../../../models/FriendWithStatus";
import { DisplayType, useDisplay } from "../../../hooks/useDisplay";
import { useSocket } from "../../../hooks/useSocket";
import { useAuth } from "../../../hooks/useAuth";
import { createPrivateRoomName } from "../../../utils/socketUtils";
import { useAuthContext } from "../../../context/AuthContext";
import { ICurrentRoom } from "../../../context/DisplayContext";
import { useFriendsContext } from "../../../context/FriendsContext";
import LogoutLabel from "./features/LogoutLabel";
import SettingsLabel from "./features/SettingsLabel";
import UsersToggle from "./features/UsersToggle";

const SideBar = () => {
  const { socketState } = useSocketContext();
  const { friendsState } = useFriendsContext();
  const { displayManager, chooseChat } = useDisplay();
  const [friendsList, setFriendsList] = useState<IFriendsWithStatus>();
  const [onlineFriendsList, setOnlineFriendsList] = useState<IFriendMap>({});
  const [offlineFriendsList, setOfflineFriendsList] = useState<IFriendMap>({});
  const [active, setActive] = useState("Friends");
  const [showCard, setShowCard] = useState("");
  const { state } = useAuthContext();
  const userImage: string = state.profileImg ? state.profileImg : "";
  const userNick: string = state.nickname ? state.nickname : "";

  const handleTabChange = (value: string) => {
    if (value === "Online Friends") {
      setShowCard("Online Friends");
    }

    if (value === "Offline Friends") {
      setShowCard("Offline Friends");
    }
  };
  const { logout } = useAuth();
  const { disconnectingSocket } = useSocket();

  const onLogout = async () => {
    disconnectingSocket();
    await logout();
  };

  const onClickSettings = () => {
    setActive("Settings");
    displayManager(DisplayType.CLOSE_HEADERS);
  };

  useEffect(() => {
    displayManager(DisplayType.HEADERS);
    //setOnlineFriendsList(socketState.friends.onlineFriends);
    //setOfflineFriendsList(socketState.friends.offlineFriends);
    setFriendsList(friendsState.friends);
  }, [friendsState]);

  const data = [
    { link: "", label: "Notifications", icon: IconBellRinging, variance: "0" },
  ];
  const friends = (
    <a
      className={classes.link}
      data-active={"Friends" === active || undefined}
      href=""
      onClick={(event) => {
        event.preventDefault();
        setActive("Friends");
        handleTabChange("Friends");
        displayManager(DisplayType.HEADERS);
      }}
    >
      <IconFriends className={classes.linkIcon} stroke={1.5} />
      <span>Friends</span>
    </a>
  );

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
        displayManager(DisplayType.CLOSE_HEADERS);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
      <span>({item.variance})</span>
    </a>
  ));

  return (
    <Paper className={classes.sideBar} bg="cyan">
      <ScrollArea p="sm" className={classes.sideScroller}>
        <Flex py="sm" px="sm">
          <Avatar src={userImage} />
          <Text ff="sans-serif" fs="italic" ml={10}>
            {userNick}
          </Text>
        </Flex>
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
          {friends}
          <Group className={classes.header} justify="space-between"></Group>
          {/*links*/}
        </div>
        <div className={classes.usersContainer}>
          {friendsList?.onlineFriends !== undefined && (
            <UsersToggle
              friendsList={friendsList.onlineFriends}
              Icon={IconUsers}
              title="Online Friends"
            />
          )}
          {friendsList?.offlineFriends !== undefined && (
            <UsersToggle
              friendsList={friendsList.offlineFriends}
              Icon={IconUserOff}
              title="Offline Friends"
            />
          )}
        </div>

        <div className={classes.footer}>
          <SettingsLabel onClickSettings={onClickSettings} active={active} />

          <LogoutLabel onLogout={onLogout} />
        </div>
      </ScrollArea>
    </Paper>
  );
};

export default SideBar;
