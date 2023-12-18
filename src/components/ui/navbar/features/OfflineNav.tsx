import { Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "../Navbar.module.css";

const OfflineNav = () => {
  return (
    <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
      <Button variant="filled" component={Link} to="/">
        Login
      </Button>

      <Button variant="filled" component={Link} to="/register">
        Register
      </Button>
    </Group>
  );
};

export default OfflineNav;
