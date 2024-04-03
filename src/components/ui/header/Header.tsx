import { Container, Group, ThemeIcon, Image } from "@mantine/core";
import Cookies from "js-cookie";
import { useAuthContext } from "../../../context/AuthContext";
import classes from "./Header.module.css";
import UserDropMenu from "./features/UserDropMenu";
import HeaderTabs from "./features/HeaderTabs";
import { useDisplayContext } from "../../../context/DisplayContext";
const Header = () => {
  const { state } = useAuthContext();
  const { displayState } = useDisplayContext();
  const token = Cookies.get("jwt_token");
  const userImage: string = state.profileImg ? state.profileImg : "";
  const userNick: string = state.nickname ? state.nickname : "";
  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <ThemeIcon size="xl">
            <Image
              src="/logos/blue.png"
              style={{ width: "100%", height: "100%" }}
            />
          </ThemeIcon>
          {token && (
            <UserDropMenu userImage={userImage} userNickname={userNick} />
          )}
        </Group>
      </Container>
      {displayState.showHeaders && <HeaderTabs />}
    </div>
  );
};

export default Header;
