import { useEffect, useRef, useState } from "react";
import { Avatar, Card, Flex, List, ScrollArea, Text } from "@mantine/core";
import { IconBrandHipchat, IconBan } from "@tabler/icons-react";
import { useFriends } from "../../../hooks/useFriends";
import { IFriendship } from "../../../models/Friendship";
import classes from "./Cards.module.css";
import { useDisplay } from "../../../hooks/useDisplay";

const FriendsCard = () => {
  const { getFriends } = useFriends();
  const [friends, setFriends] = useState<IFriendship[]>([]);
  const effectRan = useRef(false);
  const { chooseOverlayImage } = useDisplay();

  const onGetFriends = async () => {
    try {
      const res: IFriendship[] = await getFriends();
      console.log(res);
      await setFriends(res);
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
              <div key={fShip.id} className={classes.friendsDiv}>
                <Avatar
                  src={fShip.profileImg}
                  onClick={() => chooseOverlayImage(fShip.profileImg)}
                />
                <Text ff="sans-serif" fs="italic">
                  {fShip.nickname}
                </Text>
                <Flex>
                  <IconBrandHipchat />
                  <IconBan />
                </Flex>
              </div>
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
