import { Avatar, Paper, Text } from "@mantine/core";

const ChatHeader = () => {
  return (
    <Paper bg="cyan" p="md" style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar radius="xl" style={{ marginRight: "10px" }} />
        <Text fw={500}>Suson</Text>
      </div>
    </Paper>
  );
};

export default ChatHeader;
