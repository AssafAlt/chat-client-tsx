import { Avatar, Paper, Text } from "@mantine/core";

interface IChatHeaderProps {
  profileImg: string;
  friendNickname: string;
}

const ChatHeader = (props: IChatHeaderProps) => {
  return (
    <Paper bg="cyan" p="md" style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          radius="xl"
          src={props.profileImg}
          style={{ marginRight: "10px" }}
        />
        <Text fw={500}>{props.friendNickname}</Text>
      </div>
    </Paper>
  );
};

export default ChatHeader;
