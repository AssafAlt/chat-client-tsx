import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconSettings,
  IconTrash,
  IconChevronDown,
} from "@tabler/icons-react";
import { useAuth } from "../../../../hooks/useAuth";
import classes from "../Header.module.css";

interface IUserDropMenuProps {
  userImage: string;
  userNickname: string;
}

const UserDropMenu = (props: IUserDropMenuProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const onLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: "pop-top-right" }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={`${classes.user} ${
              userMenuOpened ? classes.userActive : ""
            }`}
          >
            <Group gap={7}>
              <Avatar
                src={props.userImage}
                alt={props.userNickname}
                radius="xl"
                size={20}
              />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {props.userNickname}
              </Text>
              <IconChevronDown
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
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
            leftSection={
              <IconLogout
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            onClick={onLogout}
          >
            Logout
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>

          <Menu.Item
            color="red"
            leftSection={
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          >
            Delete account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default UserDropMenu;
