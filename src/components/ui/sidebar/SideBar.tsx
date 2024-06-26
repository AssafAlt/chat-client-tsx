import { useState, useEffect } from "react";
import {
  Text,
  Group,
  Code,
  TextInput,
  rem,
  Paper,
  Avatar,
  ScrollArea,
} from "@mantine/core";
import { IconBellRinging, IconUsers, IconUserOff } from "@tabler/icons-react";

import classes from "./SideBar.module.css";
import { IFriendsWithStatus } from "../../../models/FriendWithStatus";
import { useDisplay } from "../../../hooks/useDisplay";
import { useSocket } from "../../../hooks/useSocket";
import { useAuth } from "../../../hooks/useAuth";
import { useAuthContext } from "../../../context/AuthContext";
import { useFriendsContext } from "../../../context/FriendsContext";
import LogoutLabel from "./features/LogoutLabel";
import SettingsLabel from "./features/SettingsLabel";
import UsersToggle from "./features/UsersToggle";
import { useNavigate } from "react-router-dom";
import FriendsHeaderTrigger from "./features/FriendsHeaderTrigger";

const SideBar = () => {
  const { friendsState } = useFriendsContext();
  const { chooseOverlayImage } = useDisplay();
  const [friendsList, setFriendsList] = useState<IFriendsWithStatus>();

  const navigate = useNavigate();
  const { state } = useAuthContext();
  const userImage: string = state.profileImg ? state.profileImg : "";
  const userNick: string = state.nickname ? state.nickname : "";

  const { logout } = useAuth();
  const { disconnectingSocket } = useSocket();

  const onLogout = () => {
    logout();
    disconnectingSocket();
    navigate("/");
  };

  useEffect(() => {
    setFriendsList(friendsState.friends);
  }, [friendsState]);

  return (
    <Paper className={classes.sideBar} visibleFrom="xs">
      <ScrollArea p="sm" className={classes.sideScroller} c="cyan">
        <div className={classes.userHeader}>
          <Avatar
            src={userImage}
            onClick={() => chooseOverlayImage(userImage)}
          />
          <Text ff="sans-serif" fs="italic" ml={10}>
            {userNick}
          </Text>
        </div>
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
          <SettingsLabel />

          <LogoutLabel onLogout={onLogout} />
        </div>
      </ScrollArea>
    </Paper>
  );
};

export default SideBar;
