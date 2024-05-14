import { useEffect, useRef } from "react";
import MobileFooter from "../../components/mobile/footer/MobileFooter";
import MobileUsersList from "../../components/mobile/users/MobileUsersList";
import classes from "./MobileHome.module.css";
import { useSocket } from "../../hooks/useSocket";
import { useFriends } from "../../hooks/useFriends";
import { Paper, Text } from "@mantine/core";
import ChatRoom from "../../components/ui/chat/ChatRoom";
import { useDisplayContext } from "../../context/DisplayContext";
import AddFriendCard from "../../components/ui/cards/AddFriendCard";
import FriendRequestsCard from "../../components/ui/cards/FriendRequestsCard";
import FriendsCard from "../../components/ui/cards/FriendsCard";
import { useAuthContext } from "../../context/AuthContext";
import SetProfilePic from "../../components/user_settings/SetProfilePic";
import ImageOverlay from "../../components/ui/image-overlay/ImageOverlay";

const MobileHome = () => {
  const { state } = useAuthContext();
  const { profileImg, nickname, isFirstLogin } = state;
  const imagePath = profileImg ? profileImg : "";
  const userNickname = nickname ? nickname : "";
  const { connectingSocket } = useSocket();
  const { getFriendsWithStatus, getFriendRequests } = useFriends();
  const { displayState } = useDisplayContext();
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
    <div className={classes.homeContainer}>
      {displayState.overlay.isVisible && <ImageOverlay />}
      {isFirstLogin && (
        <div>
          <Paper>
            <Text ta="center" fz="lg" fw={500} mt="md">
              You haven't chosen a profile image yet. Would you like to choose
              one now?
            </Text>
            <SetProfilePic imageSrc={imagePath} userNickname={userNickname} />
          </Paper>
        </div>
      )}
      <>
        {displayState.showChat ? (
          <ChatRoom key={displayState.currentChat.currentRoom} />
        ) : (
          <>
            {displayState.showMobileTab === "Chats" && <MobileUsersList />}
            {displayState.showMobileTab === "Friends" && <FriendsCard />}
            {displayState.showMobileTab === "Pending" && <FriendRequestsCard />}
            {displayState.showMobileTab === "Add" && <AddFriendCard />}

            <MobileFooter />
          </>
        )}
      </>
    </div>
  );
};

export default MobileHome;
