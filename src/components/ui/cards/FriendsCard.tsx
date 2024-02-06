import { useEffect, useRef, useState } from "react";
import { Avatar, Card, Flex, List, Text } from "@mantine/core";
import { IconBrandHipchat, IconBan } from "@tabler/icons-react";
import { useFriends } from "../../../hooks/useFriends";
import { IFriendship } from "../../../models/Friendship";

const FriendsCard = () => {
  const { getFriends } = useFriends();
  const [friends, setFriends] = useState<IFriendship[]>([]);
  const effectRan = useRef(false);

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
    <Card padding="md" radius="md" bg="cyan">
      {friends.length ? (
        <List py="sm">
          {friends.map((fShip) => (
            <Flex key={fShip.id} justify="space-between" py="sm" px="sm">
              <Avatar src={fShip.profileImg} />
              <Text ff="sans-serif" fs="italic">
                {fShip.nickname}
              </Text>
              <Flex>
                <IconBrandHipchat />
                <IconBan />
              </Flex>
            </Flex>
          ))}
        </List>
      ) : (
        <Text>No Friends</Text>
      )}
    </Card>
  );
};

export default FriendsCard;
