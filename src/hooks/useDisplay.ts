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

  const chooseMobileTabToShow = (chosenTab: string) => {
    displayDispatch({ type: "SHOW_MOBILE_TAB", payload: chosenTab });
  };

  const chooseOverlayImage = (imageSrc: string) => {
    displayDispatch({ type: "SHOW_OVERLAY", payload: imageSrc });
  };

  return {
    displayManager,
    chooseChat,
    chooseMobileTabToShow,
    chooseOverlayImage,
  };
};
