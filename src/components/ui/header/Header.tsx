import { Container, Group, ThemeIcon, Image } from "@mantine/core";
import { useAuthContext } from "../../../context/AuthContext";
import classes from "./Header.module.css";
import UserDropMenu from "./features/UserDropMenu";
import HeaderTabs from "./features/HeaderTabs";
const Header = () => {
  const { state } = useAuthContext();
  const userImage: string = state.profileImg ? state.profileImg : "";
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
          {state.nickname && (
            <UserDropMenu userImage={userImage} userNickname={state.nickname} />
          )}
        </Group>
      </Container>
      {state.nickname && <HeaderTabs />}
    </div>
  );
};

export default Header;
