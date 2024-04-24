import Cookies from "js-cookie";
import HeaderTabs from "./features/HeaderTabs";
import { useDisplayContext } from "../../../context/DisplayContext";
import classes from "./Header.module.css";

const Header = () => {
  const { displayState } = useDisplayContext();
  const token = Cookies.get("jwt_token");

  return (
    <>
      {token && (
        <div className={classes.header}>
          {displayState.showHeaders && <HeaderTabs />}
        </div>
      )}
    </>
  );
};

export default Header;
