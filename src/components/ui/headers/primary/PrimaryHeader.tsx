import { Flex, Text } from "@mantine/core";
import Cookies from "js-cookie";
import MobileDropMenu from "../../../mobile/dropmenu/MobileDropMenu";
import classes from "./PrimaryHeader.module.css";
import { useAuthContext } from "../../../../context/AuthContext";

/*
interface IPrimaryHeaderProps {
  isConnected: boolean;
}
: React.FC<IPrimaryHeaderProps> = ({ isConnected })*/

const PrimaryHeader = () => {
  const { state } = useAuthContext();

  return (
    <nav className={classes.primaryHeader}>
      <Flex>
        <Text c="cyan" className={classes.textOne}>
          Capitan
        </Text>
        <Text className={classes.textTwo}>ChatApp</Text>
      </Flex>
      {state.nickname && <MobileDropMenu />}
    </nav>
  );
};

export default PrimaryHeader;