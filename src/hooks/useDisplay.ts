import { useDisplayContext, ICurrentRoom } from "../context/DisplayContext";

export enum DisplayType {
  CHAT = "SHOW_CHAT",
  HEADERS = "SHOW_HEADERS",
  CLOSE_HEADERS = "CLOSE_HEADERS",
}

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

  return { displayManager, chooseChat, closeChat, chooseMobileTabToShow };
};
