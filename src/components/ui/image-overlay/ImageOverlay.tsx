import classes from "./ImageOverlay.module.css";
import { Avatar } from "@mantine/core";
import { useDisplayContext } from "../../../context/DisplayContext";
import { useDisplay } from "../../../hooks/useDisplay";

const ImageOverlay = () => {
  const { displayState } = useDisplayContext();
  const { closeOverlay } = useDisplay();

  return (
    <div className={classes.overlayContainer} onClick={closeOverlay}>
      <div className={classes.overLaycontent}>
        <Avatar
          src={displayState.overlay.source}
          alt="enlarged-image"
          className={classes.overlayAvatar}
        />
      </div>
    </div>
  );
};

export default ImageOverlay;
