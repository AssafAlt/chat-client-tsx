import { Menu, rem } from "@mantine/core";
import { IconDotsVertical, IconLogout } from "@tabler/icons-react";
import { useAuth } from "../../../hooks/useAuth";
import { useSocket } from "../../../hooks/useSocket";
import classes from "./MobileDropMenu.module.css";

const MobileDropMenu = () => {
  const { logout } = useAuth();
  const { disconnectingSocket } = useSocket();

  const onLogout = async () => {
    disconnectingSocket();
    await logout();
  };
  return (
    <div className={classes.mobileMenu}>
      <Menu width={200} trigger="click">
        <Menu.Target>
          <IconDotsVertical />
        </Menu.Target>
        <Menu.Dropdown className={classes.mobileDropDown}>
          <Menu.Item
            onClick={onLogout}
            ta="center"
            leftSection={
              <>
                <IconLogout
                  color="red"
                  style={{ width: rem(16), height: rem(16) }}
                />
                Logout
              </>
            }
          ></Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default MobileDropMenu;
