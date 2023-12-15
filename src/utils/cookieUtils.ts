import Cookies from "js-cookie";

const getTokenFromCookie = () => {
  return Cookies.get("JWT_TOKEN");
};

export default getTokenFromCookie;
