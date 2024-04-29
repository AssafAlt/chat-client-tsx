import Cookies from "js-cookie";
import HeaderTabs from "./features/HeaderTabs";
import { useDisplayContext } from "../../../context/DisplayContext";
import classes from "./Header.module.css";
import PrimaryHeader from "./features/PrimaryHeader";

const Header = () => {
  const { displayState } = useDisplayContext();
  const token = Cookies.get("jwt_token");

  return (
    <div>
      <PrimaryHeader isConnected={token ? true : false} />
      {token && (
        <div className={classes.friendsHeader}>
          {displayState.showHeaders && <HeaderTabs />}
        </div>
      )}
    </div>
  );
};

export default Header;
