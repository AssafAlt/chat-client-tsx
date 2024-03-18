import { Paper, Text } from "@mantine/core";
import { useAuthContext } from "../context/AuthContext";
//("http://localhost:8080/ws")

import SetProfilePic from "../components/user_settings/SetProfilePic";
import { useEffect } from "react";
import Cookies from "js-cookie";
import ChatComponent from "../components/ChatComponent";

const Home = () => {
  const { state } = useAuthContext();
  const imagePath = state.profileImg ? state.profileImg : "";
  const userNickname = state.nickname ? state.nickname : "";
  const token = Cookies.get("jwt_token") ?? "";

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
      <ChatComponent />
    </div>
  );
};

export default Home;
