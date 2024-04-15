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

  return { displayManager, chooseChat };
};
