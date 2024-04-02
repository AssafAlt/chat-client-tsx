import { Button, Paper, Text } from "@mantine/core";
import { useAuthContext } from "../context/AuthContext";
//("http://localhost:8080/ws")

import SetProfilePic from "../components/user_settings/SetProfilePic";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import ChatComponent from "../components/ChatComponent";
import { useSocket } from "../hooks/useSocket";
import { useSocketContext } from "../context/SocketContext";
import Test from "../components/Test";
import { useFriends } from "../hooks/useFriends";
import { FriendWithStatus } from "../models/FriendWithStatus";

const Home = () => {
  const { state } = useAuthContext();
  const imagePath = state.profileImg ? state.profileImg : "";
  const userNickname = state.nickname ? state.nickname : "";
  const token = Cookies.get("jwt_token") ?? "";
  const { connectingSocket, disconnectingSocket } = useSocket();
  const { socketState } = useSocketContext();
  const { getOnlineFriends } = useFriends();
  const [isClicked, setIsClicked] = useState(false);
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
      {state.isFirstLogin && (
        <Paper>
          <Text ta="center" fz="lg" fw={500} mt="md">
            You don't choose profile image yet, would you like to choose one
            now?
          </Text>
          <SetProfilePic imageSrc={imagePath} userNickname={userNickname} />
        </Paper>
      )}
      {isClicked ? (
        <Test />
      ) : (
        <Button onClick={() => setIsClicked(true)}>Open</Button>
      )}
    </div>
  );
};

export default Home;
