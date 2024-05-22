import { IconArrowRight } from "@tabler/icons-react";
import DeleteAccountModal from "../modals/DeleteAccountModal";
import SetProfilePic from "./SetProfilePic";
import classes from "./SettingsWindow.module.css";
import { Paper, ScrollArea, Text } from "@mantine/core";
import { useDisplay } from "../../../hooks/useDisplay";

const SettingsWindow = () => {
  const { closeSettings } = useDisplay();
  return (
    <Paper className={classes.settingsWindow}>
      <div className={classes.settingsHeader}>
        <IconArrowRight onClick={closeSettings} />
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
