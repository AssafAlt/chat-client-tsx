import { IconSettings } from "@tabler/icons-react";

import classes from "../SideBar.module.css";

interface ISettingsLabelProps {
  onClickSettings: () => void;
  active: string;
}
const SettingsLabel = (props: ISettingsLabelProps) => {
  return (
    <div
      data-active={"Settings" === props.active || undefined}
      className={classes.link}
      onClick={props.onClickSettings}
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
