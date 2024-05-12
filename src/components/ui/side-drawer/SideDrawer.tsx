import { Drawer } from "@mantine/core";
import React from "react";
import MobileUsersList from "../../mobile/users/MobileUsersList";
import { useDisplayContext } from "../../../context/DisplayContext";
import ChatRoom from "../chat/ChatRoom";
import { useDisplay } from "../../../hooks/useDisplay";

interface ISideDrawerProps {
  drawerOpened: boolean;
  closeDrawer: () => void;
}

const SideDrawer: React.FC<ISideDrawerProps> = ({
  drawerOpened,
  closeDrawer,
}) => {
  const { displayState } = useDisplayContext();
  const { closeChat } = useDisplay();

  const onCloseDrawer = () => {
    closeChat();
    closeDrawer();
  };
  return (
    <Drawer
      opened={drawerOpened}
      onClose={onCloseDrawer}
      size="100%"
      padding="sm"
      title="Side Bar"
      zIndex={1000000}
    >
      <div onClick={closeDrawer}>
        <MobileUsersList />
      </div>
    </Drawer>
  );
};

export default SideDrawer;
