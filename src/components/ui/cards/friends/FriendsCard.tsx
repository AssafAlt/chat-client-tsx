import { useEffect, useRef, useState } from "react";
import { Card, List, ScrollArea, Text } from "@mantine/core";
import { useFriends } from "../../../../hooks/useFriends";
import { IFriendship } from "../../../../models/Friendship";
import { useDisplay } from "../../../../hooks/useDisplay";
import FriendsCardRow from "./FriendsCardRow";
import classes from "../Cards.module.css";

const FriendsCard = () => {
  const { getFriends, deleteFriendship } = useFriends();

  const [friends, setFriends] = useState<IFriendship[]>([]);
  const effectRan = useRef(false);
  const { chooseChat, chooseOverlayImage } = useDisplay();

  const onGetFriends = async () => {
    try {
      const res: IFriendship[] = await getFriends();
      setFriends(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteFriendship = async (
    friendshipId: number,
    nicknameToDelete: string
  ) => {
    try {
      await deleteFriendship(friendshipId, nicknameToDelete);
      setFriends((prevFriends) =>
        prevFriends.filter((fship) => fship.id !== friendshipId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => {
      if (effectRan.current === false) {
        onGetFriends();
      }

      return () => {
        //unmounting
        effectRan.current = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Card padding="md" radius="md" className={classes.mobileCard}>
      <ScrollArea p="sm" className={classes.scroller}>
        <Text ta="center" c="cyan" hiddenFrom="sm">
          All Friends
        </Text>
        {friends.length ? (
          <List py="sm">
            {friends.map((fShip) => (
              <FriendsCardRow
                key={fShip.id}
                friendship={fShip}
                chooseOverlayImage={chooseOverlayImage}
                chooseChat={chooseChat}
                onDeleteFriendship={onDeleteFriendship}
              />
            ))}
          </List>
        ) : (
          <Text>No Friends</Text>
        )}
      </ScrollArea>
    </Card>
  );
};

export default FriendsCard;
