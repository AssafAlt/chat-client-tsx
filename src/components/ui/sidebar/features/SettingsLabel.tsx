import { IconSettings } from "@tabler/icons-react";

import classes from "../SideBar.module.css";
import { useDisplay } from "../../../../hooks/useDisplay";
import { useState } from "react";

const SettingsLabel = () => {
  const { showSettings, closeSettings } = useDisplay();
  const [isClicked, setIsClicked] = useState(false);
  const onClickSettings = () => {
    setIsClicked(!isClicked);
    switch (isClicked) {
      case false:
        setIsClicked(true);
        showSettings();
        return;

      case true:
        setIsClicked(false);
        closeSettings();
        return;
    }
  };
  return (
    <div
      data-active={isClicked || undefined}
      onClick={onClickSettings}
      className={classes.link}
      onMouseEnter={(event) => {
        event.currentTarget.style.cursor = "pointer";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.cursor = "auto";
      }}
    >
      <IconSettings className={classes.linkIcon} stroke={1.5} />
      <span>Settings</span>
    </div>
  );
};

export default SettingsLabel;
