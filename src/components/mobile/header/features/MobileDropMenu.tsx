import { Menu, rem } from "@mantine/core";
import { IconDotsVertical, IconLogout } from "@tabler/icons-react";

const MobileDropMenu = () => {
  return (
    <Menu width={200} trigger="click">
      <Menu.Target>
        <IconDotsVertical />
      </Menu.Target>
      <Menu.Dropdown style={{ zIndex: 9999, position: "absolute" }}>
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
  );
};

export default MobileDropMenu;
