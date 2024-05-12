import { Avatar, Paper, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import classes from "./ChatHeader.module.css";
import { useDisplay } from "../../../../hooks/useDisplay";

interface IChatHeaderProps {
  profileImg: string;
  friendNickname: string;
}

const ChatHeader = (props: IChatHeaderProps) => {
  const { closeChat } = useDisplay();
  return (
    <Paper bg="cyan" p="md" style={{ marginBottom: "20px" }}>
      <div className={classes.headContainer}>
        <div className={classes.innerContainer}>
          <Avatar
            radius="xl"
            src={props.profileImg}
            style={{ marginRight: "10px" }}
          />
          <Text fw={500}>{props.friendNickname}</Text>
        </div>
        <IconArrowRight
          className={classes.arrowButton}
          onClick={() => {
            closeChat();
          }}
        />
      </div>
    </Paper>
  );
};

export default ChatHeader;
