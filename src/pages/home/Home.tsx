import { Burger, Paper, Text } from "@mantine/core";
import { useAuthContext } from "../../context/AuthContext";
import SetProfilePic from "../../components/user_settings/SetProfilePic";
import { useEffect, useRef } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useFriends } from "../../hooks/useFriends";
import SideBar from "../../components/ui/sidebar/SideBar";
import ChatRoom from "../../components/ui/chat/ChatRoom";
import { useDisplayContext } from "../../context/DisplayContext";
import FriendsHeader from "../../components/ui/headers/friends/FriendsHeader";
import classes from "./Home.module.css";
import { useDisclosure } from "@mantine/hooks";
import SideDrawer from "../../components/ui/side-drawer/SideDrawer";
import ImageOverlay from "../../components/ui/image-overlay/ImageOverlay";

const Home = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { connectingSocket } = useSocket();
  const { getFriendsWithStatus, getFriendRequests } = useFriends();
  const { displayState } = useDisplayContext();
  const effectRan = useRef(false);

  const onGetFriendRequests = async () => {
    try {
      await getFriendRequests();
    } catch (error) {
      console.log(error);
    }
  };
  const onConnect = async () => {
    try {
      await connectingSocket();
    } catch (error) {
      console.log(error);
    }
  };

  const onGetFriends = async () => {
    try {
      await getFriendsWithStatus();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(
    () => {
      if (effectRan.current === false) {
        onGetFriends()
          .then(() => onConnect())
          .then(() => onGetFriendRequests())
          .catch((err) => console.log(err));
      }

      return () => {
        effectRan.current = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className={classes.homeContainer}>
      {displayState.overlay.isVisible && <ImageOverlay />}
      <Burger
        color="cyan"
        opened={drawerOpened}
        onClick={toggleDrawer}
        hiddenFrom="xs"
      />

      <div className={classes.mainContainer}>
        <SideBar />
        <div className={classes.friendsHeaderContainer}>
          {displayState.showHeaders && <FriendsHeader />}
        </div>
        <SideDrawer drawerOpened={drawerOpened} closeDrawer={closeDrawer} />

        {displayState.showChat && (
          <ChatRoom key={displayState.currentChat.currentRoom} />
        )}
      </div>
    </div>
  );
};

export default Home;
