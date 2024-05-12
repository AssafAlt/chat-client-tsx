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
  Burger,
  Drawer,
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
import { useNavigate } from "react-router-dom";
import FriendsHeaderTrigger from "./features/FriendsHeaderTrigger";
import { useDisclosure } from "@mantine/hooks";
import SideDrawer from "../side-drawer/SideDrawer";

const SideBar = () => {
  const { socketState } = useSocketContext();

  const { friendsState } = useFriendsContext();

  const { displayManager, chooseChat } = useDisplay();
  const [friendsList, setFriendsList] = useState<IFriendsWithStatus>();
  const [onlineFriendsList, setOnlineFriendsList] = useState<IFriendMap>({});
  const [offlineFriendsList, setOfflineFriendsList] = useState<IFriendMap>({});
  const [active, setActive] = useState("");
  const [showCard, setShowCard] = useState("");
  const navigate = useNavigate();
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

  const onLogout = () => {
    logout();
    disconnectingSocket();
    navigate("/");
  };

  const onClickSettings = () => {
    setActive("Settings");
    displayManager(DisplayType.CLOSE_HEADERS);
  };

  useEffect(() => {
    //displayManager(DisplayType.HEADERS);
    //setOnlineFriendsList(socketState.friends.onlineFriends);
    //setOfflineFriendsList(socketState.friends.offlineFriends);
    setFriendsList(friendsState.friends);
  }, [friendsState]);

  return (
    <Paper className={classes.sideBar} visibleFrom="xs">
      <ScrollArea p="sm" className={classes.sideScroller} bg="cyan">
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
          <FriendsHeaderTrigger />
          <Group className={classes.header} justify="space-between"></Group>
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
