import { Button, Flex, Paper, Text } from "@mantine/core";
import { useAuthContext } from "../context/AuthContext";
import SetProfilePic from "../components/user_settings/SetProfilePic";
import { useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import { useFriends } from "../hooks/useFriends";
import SideBar from "../components/ui/sidebar/SideBar";
import ChatRoom from "../components/ui/chat/ChatRoom";
import { useDisplayContext } from "../context/DisplayContext";

const Home = () => {
  const { state } = useAuthContext();
  const imagePath = state.profileImg ? state.profileImg : "";
  const userNickname = state.nickname ? state.nickname : "";
  const { connectingSocket } = useSocket();
  const { getFriendsWithStatus } = useFriends();
  const { displayState } = useDisplayContext();
  const effectRan = useRef(false);

  const connect = async () => {
    await connectingSocket();
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
        onGetFriends().then(() => connect());
      }

      return () => {
        effectRan.current = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: "1", marginLeft: "20px" }}>
        {state.isFirstLogin && (
          <Paper>
            <Text ta="center" fz="lg" fw={500} mt="md">
              You haven't chosen a profile image yet. Would you like to choose
              one now?
            </Text>
            <SetProfilePic imageSrc={imagePath} userNickname={userNickname} />
          </Paper>
        )}
      </div>

      {displayState.showChat && <ChatRoom />}
    </div>
  );
};

export default Home;
