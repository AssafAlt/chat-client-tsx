import { IconArrowRight } from "@tabler/icons-react";
import DeleteAccountModal from "../modals/DeleteAccountModal";
import SetProfilePic from "./SetProfilePic";
import classes from "./SettingsWindow.module.css";
import { Paper, ScrollArea, Text } from "@mantine/core";
import { useDisplay } from "../../../hooks/useDisplay";
import { DisplayType } from "../../../models/DisplayType";

const SettingsWindow = () => {
  const { displayManager } = useDisplay();
  return (
    <Paper className={classes.settingsWindow}>
      <div className={classes.settingsHeader}>
        <IconArrowRight
          onClick={() => displayManager(DisplayType.CLOSE_SETTINGS)}
        />
      </div>
      <Text size="xl">Settings</Text>
      <ScrollArea p="sm" className={classes.scroller}>
        <div className={classes.profileCard}>
          <Text size="lg">Choose Profile Picture</Text>
          <SetProfilePic />
        </div>

        <div className={classes.deleteCard}>
          <Text size="lg">Delete Account</Text>
          <DeleteAccountModal />
        </div>
      </ScrollArea>
    </Paper>
  );
};

export default SettingsWindow;
