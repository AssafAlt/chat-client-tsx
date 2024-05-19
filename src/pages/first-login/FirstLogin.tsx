import classes from "./FirstLogin.module.css";
import { Paper, Text } from "@mantine/core";
import SetProfilePic from "../../components/ui/user_settings/SetProfilePic";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const FirstLogin = () => {
  const { state } = useAuthContext();
  const { profileImg, nickname, isFirstLogin } = state;
  const imagePath = profileImg ? profileImg : "";
  const userNickname = nickname ? nickname : "";

  return (
    <div className={classes.firstContainer}>
      {isFirstLogin ? (
        <Paper>
          <Text ta="center" size="xl" fw={500} mt="md" className={classes.text}>
            You haven't chosen a profile image yet. Would you like to choose one
            now?
          </Text>
          <SetProfilePic />
        </Paper>
      ) : (
        <Navigate to="/home" />
      )}
    </div>
  );
};

export default FirstLogin;
