import { Paper, Text } from "@mantine/core";
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

const Home = () => {
  const { state } = useAuthContext();
  const { profileImg, nickname, isFirstLogin } = state;
  const imagePath = profileImg ? profileImg : "";
  const userNickname = nickname ? nickname : "";
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
    <>
      <div className={classes.friendsHeader}>
        {displayState.showHeaders && <FriendsHeader />}
      </div>
      <div className={classes.home}>
        <SideBar />
        <div style={{ flex: "1", marginLeft: "20px" }}>
          {isFirstLogin && (
            <Paper>
              <Text ta="center" fz="lg" fw={500} mt="md">
                You haven't chosen a profile image yet. Would you like to choose
                one now?
              </Text>
              <SetProfilePic imageSrc={imagePath} userNickname={userNickname} />
            </Paper>
          )}
        </div>

        {displayState.showChat && (
          <ChatRoom key={displayState.currentChat.currentRoom} />
        )}
      </div>
    </>
  );
};

export default Home;
