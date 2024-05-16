import { Menu, rem } from "@mantine/core";
import {
  IconDotsVertical,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";
import { useAuth } from "../../../hooks/useAuth";
import { useSocket } from "../../../hooks/useSocket";
import classes from "./MobileDropMenu.module.css";
import { useNavigate } from "react-router-dom";
import DeleteAccountModal from "../../ui/modals/DeleteAccountModal";

const MobileDropMenu = () => {
  const { logout } = useAuth();
  const { disconnectingSocket } = useSocket();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    disconnectingSocket();
    navigate("/");
  };

  return (
    <div className={classes.mobileMenu}>
      <Menu width={200} trigger="click">
        <Menu.Target>
          <IconDotsVertical />
        </Menu.Target>
        <Menu.Dropdown className={classes.mobileDropDown}>
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            leftSection={
              <IconSettings
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          >
            Account settings
          </Menu.Item>
          <Menu.Item
            onClick={onLogout}
            leftSection={
              <IconLogout
                color="red"
                style={{ width: rem(16), height: rem(16) }}
              />
            }
          >
            Logout
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <DeleteAccountModal />
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default MobileDropMenu;
