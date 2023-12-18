import { Avatar, Text, Button, Paper } from "@mantine/core";

interface SetProfileProps {
  imageSrc: string;
  text: string;
}

const SetProfile = (props: SetProfileProps) => {
  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar src={props.imageSrc} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {props.text}
      </Text>

      <Button variant="default" fullWidth mt="md">
        Choose Profile Image
      </Button>
    </Paper>
  );
};
export default SetProfile;
