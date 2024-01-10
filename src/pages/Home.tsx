import { Paper, Text } from "@mantine/core";

import { useAuthContext } from "../context/AuthContext";

import SetProfilePic from "../components/user_settings/SetProfilePic";

const Home = () => {
  const { state } = useAuthContext();
  const imagePath = state.profileImg ? state.profileImg : "";
  const userNickname = state.nickname ? state.nickname : "";
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
    </div>
  );
};

export default Home;
