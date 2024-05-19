import DeleteAccountModal from "../modals/DeleteAccountModal";
import SetProfilePic from "./SetProfilePic";
import classes from "./SettingsWindow.module.css";
import { Paper, ScrollArea, Text } from "@mantine/core";

const SettingsWindow = () => {
  return (
    <Paper className={classes.settingsWindow}>
      <ScrollArea p="sm" className={classes.scroller}>
        <Text size="xl">Settings</Text>
        <div>
          <Text size="lg">Choose Profile Picture</Text>
          <SetProfilePic />
        </div>

        <div>
          <Text size="lg">Delete Account</Text>
          <DeleteAccountModal />
        </div>
      </ScrollArea>
    </Paper>
  );
};

export default SettingsWindow;
