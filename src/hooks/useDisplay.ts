import { useDisplayContext, ICurrentRoom } from "../context/DisplayContext";
import { DisplayType } from "../models/DisplayType";

export const useDisplay = () => {
  const { displayDispatch } = useDisplayContext();
  const displayManager = (display: DisplayType) => {
    displayDispatch({ type: display });
  };

  const chooseChat = (room: ICurrentRoom) => {
    displayDispatch({ type: "CHOOSE_CHAT", payload: room });
  };

  const closeChat = () => {
    displayDispatch({ type: "CLOSE_CHAT" });
  };

  const chooseMobileTabToShow = (chosenTab: string) => {
    displayDispatch({ type: "SHOW_MOBILE_TAB", payload: chosenTab });
  };

  const chooseOverlayImage = (imageSrc: string) => {
    displayDispatch({ type: "SHOW_OVERLAY", payload: imageSrc });
  };

  const closeOverlay = () => {
    displayDispatch({ type: "CLOSE_OVERLAY" });
  };

  const showSettings = () => {
    displayDispatch({ type: "SHOW_SETTINGS" });
  };

  const closeSettings = () => {
    displayDispatch({ type: "DEFAULT_DISPLAY" });
  };

  return {
    displayManager,
    chooseChat,
    closeChat,
    chooseMobileTabToShow,
    chooseOverlayImage,
    closeOverlay,
    showSettings,
    closeSettings,
  };
};
