import { Menu, rem } from "@mantine/core";
import { IconDotsVertical, IconLogout } from "@tabler/icons-react";
import classes from "./MobileDropMenu.module.css";

const MobileDropMenu = () => {
  return (
    <div className={classes.mobileMenu}>
      <Menu width={200} trigger="click">
        <Menu.Target>
          <IconDotsVertical />
        </Menu.Target>
        <Menu.Dropdown className={classes.mobileDropDown}>
          <Menu.Item
            ta="center"
            leftSection={
              <IconLogout
                color="red"
                style={{ width: rem(16), height: rem(16) }}
              />
            }
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default MobileDropMenu;
