import { useAuthContext } from "../../../context/AuthContext";
import classes from "./Navbar.module.css";
import {
  Autocomplete,
  Burger,
  Button,
  Flex,
  Group,
  Image,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import OfflineNav from "./features/OfflineNav";
import { IconSearch } from "@tabler/icons-react";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { state } = useAuthContext();
  const [opened, { toggle }] = useDisclosure(false);
  const { logout } = useAuth();

  return (
    <header className={classes.header}>
      <Flex align="center" justify="space-between" className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <ThemeIcon size="xl">
            <Image
              src="/logos/blue.png"
              style={{ width: "100%", height: "100%" }}
            />
          </ThemeIcon>
        </Group>
        {state.nickname ? (
          <>
            {" "}
            <Autocomplete
              placeholder="Search"
              leftSection={
                <IconSearch
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={3.5}
                />
              }
              visibleFrom="xs"
            />
            <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
              <Button
                variant="filled"
                color="red"
                component={Link}
                to="/"
                onClick={logout}
              >
                Logout
              </Button>
            </Group>
          </>
        ) : (
          <OfflineNav />
        )}
      </Flex>
    </header>
  );
};

export default Navbar;
