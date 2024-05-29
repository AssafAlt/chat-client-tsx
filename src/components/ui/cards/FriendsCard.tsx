import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Group,
  List,
  Modal,
  ScrollArea,
  Text,
} from "@mantine/core";
import { IconBrandHipchat, IconBan } from "@tabler/icons-react";
import { useFriends } from "../../../hooks/useFriends";
import { IFriendship } from "../../../models/Friendship";
import classes from "./Cards.module.css";
import { useDisplay } from "../../../hooks/useDisplay";
import { useDisclosure } from "@mantine/hooks";

const FriendsCard = () => {
  const { getFriends, deleteFriendship } = useFriends();
  const [opened, { open, close }] = useDisclosure(false);
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
                  <IconBan onClick={open} />
                </Flex>
                <Modal
                  opened={opened}
                  onClose={close}
                  title="Are you sure you want to delete this friend?"
                >
                  {" "}
                  <Group mt="xl" justify="right">
                    <Button
                      bg="red"
                      onClick={() =>
                        onDeleteFriendship(fShip.id, fShip.nickname)
                      }
                    >
                      Delete
                    </Button>
                    <Button>Cancel</Button>
                  </Group>
                </Modal>
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
