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
} from "@mantine/core";
import {
  IconBellRinging,
  IconSettings,
  IconLogout,
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { createPrivateRoomName } from "../../../utils/socketUtils";
import { useAuthContext } from "../../../context/AuthContext";
import { ICurrentRoom } from "../../../context/DisplayContext";
import { useFriendsContext } from "../../../context/FriendsContext";

const SideBar = () => {
  const { socketState } = useSocketContext();
  const { friendsState } = useFriendsContext();
  const { displayManager, chooseChat } = useDisplay();
  //const [friendLists, setFriendsList] = useState<FriendWithStatus[]>([]);
  /*useState<{
    [key: string]: ICurrentChatMessage[];
  }>*/
  const [friendsList, setFriendsList] = useState<IFriendsWithStatus>();
  const [onlineFriendsList, setOnlineFriendsList] = useState<IFriendMap>({});
  const [offlineFriendsList, setOfflineFriendsList] = useState<IFriendMap>({});
  const [active, setActive] = useState("Friends");
  const [showCard, setShowCard] = useState("");
  const { state } = useAuthContext();
  const userNick: string = state.nickname ? state.nickname : "";

  const handleTabChange = (value: string) => {
    if (value === "Online Friends") {
      setShowCard("Online Friends");
    }

    if (value === "Offline Friends") {
      setShowCard("Offline Friends");
    }
  };
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { disconnectingSocket } = useSocket();

  const onLogout = () => {
    logout();
    disconnectingSocket();
    navigate("/");
  };

  useEffect(() => {
    displayManager(DisplayType.HEADERS);
    //setOnlineFriendsList(socketState.friends.onlineFriends);
    //setOfflineFriendsList(socketState.friends.offlineFriends);
    setFriendsList(friendsState.friends);
  }, [friendsState]);

  const data = [
    { link: "", label: "Notifications", icon: IconBellRinging, variance: "0" },
    {
      link: "",
      label: "Online Friends",
      icon: IconUsers,
      variance: Object.keys(
        friendsState.friends.onlineFriends
      ).length.toString(),
    },
    {
      link: "",
      label: "Offline Friends",
      icon: IconUserOff,
      variance: Object.keys(
        friendsState.friends.offlineFriends
      ).length.toString(),
    },
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

  const logoutElement = (
    <a
      className={classes.link}
      data-active={"Logout" === active || undefined}
      href=""
      onClick={onLogout}
    >
      <IconLogout color="red" className={classes.linkIcon} stroke={1.5} />
      <span>Logout</span>
    </a>
  );
  const settings = (
    <a
      className={classes.link}
      data-active={"Settings" === active || undefined}
      href=""
      onClick={(event) => {
        event.preventDefault();
        setActive("Settings");
        handleTabChange("Settings");
        displayManager(DisplayType.CLOSE_HEADERS);
      }}
    >
      <IconSettings className={classes.linkIcon} stroke={1.5} />
      <span>Settings</span>
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
        {friends}
        <Group className={classes.header} justify="space-between"></Group>
        {links}
      </div>
      {showCard === "Online Friends" &&
        Object.keys(friendsState.friends.onlineFriends).length > 0 && (
          <List py="sm">
            {Object.entries(friendsState.friends.onlineFriends).map(
              ([nickname, profileImg]) => (
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
              )
            )}
          </List>
        )}

      <div className={classes.footer}>
        {settings}

        {logoutElement}
      </div>
    </Paper>
  );
};

export default SideBar;
