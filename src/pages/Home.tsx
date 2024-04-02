import { Button, Paper, Text } from "@mantine/core";
import { useAuthContext } from "../context/AuthContext";
//("http://localhost:8080/ws")

import SetProfilePic from "../components/user_settings/SetProfilePic";
import { useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import { useFriends } from "../hooks/useFriends";
import SideBar from "../components/ui/sidebar/SideBar";

const Home = () => {
  const { state } = useAuthContext();
  const imagePath = state.profileImg ? state.profileImg : "";
  const userNickname = state.nickname ? state.nickname : "";
  const { connectingSocket } = useSocket();
  const { getOnlineFriends } = useFriends();
  const effectRan = useRef(false);

  const connect = async () => {
    await connectingSocket();
  };

  const onGetFriends = async () => {
    try {
      await getOnlineFriends();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(
    () => {
      if (effectRan.current === false) {
        connect();
        onGetFriends();
      }

      return () => {
        effectRan.current = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <SideBar />
      {state.isFirstLogin && (
        <Paper>
          <Text ta="center" fz="lg" fw={500} mt="md">
            You don't choose profile image yet, would you like to choose one
            now?
          </Text>
          <SetProfilePic imageSrc={imagePath} userNickname={userNickname} />
        </Paper>
      )}
    </div>
  );
};

export default Home;
