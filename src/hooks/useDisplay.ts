import { useDisplayContext } from "../context/DisplayContext";

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

  return { displayManager };
};
