import { useEffect, useRef, useState } from "react";
import MobileFooter from "../../components/mobile/footer/MobileFooter";
import MobileUsersList from "../../components/mobile/users/MobileUsersList";
import { useFriendsContext } from "../../context/FriendsContext";
import classes from "./MobileHome.module.css";
import { IFriendsWithStatus } from "../../models/FriendWithStatus";
import { useSocket } from "../../hooks/useSocket";
import { useFriends } from "../../hooks/useFriends";

const MobileHome = () => {
  const { connectingSocket } = useSocket();
  const { getFriendsWithStatus, getFriendRequests } = useFriends();
  const effectRan = useRef(false);

  const onGetFriendRequests = async () => {
    try {
      await getFriendRequests();
    } catch (error) {
      console.log(error);
    }
  };
  const onConnect = async () => {
    try {
      await connectingSocket();
    } catch (error) {
      console.log(error);
    }
  };

  const onGetFriends = async () => {
    try {
      await getFriendsWithStatus();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(
    () => {
      if (effectRan.current === false) {
        onGetFriends()
          .then(() => onConnect())
          .then(() => onGetFriendRequests())
          .catch((err) => console.log(err));
      }

      return () => {
        effectRan.current = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div>
      <MobileUsersList />
      <MobileFooter />
    </div>
  );
};

export default MobileHome;
