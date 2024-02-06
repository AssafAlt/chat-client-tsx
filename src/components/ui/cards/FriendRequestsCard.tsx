import { useEffect, useRef, useState } from "react";
import { Card, Text } from "@mantine/core";
import { useFriends } from "../../../hooks/useFriends";
import { IGetFriendRequest } from "../../../models/FriendRequestResponses";
import FriendRequestsTable from "../tables/FriendRequestsTable";
const FriendRequestsCard = () => {
  const { getFriendRequests } = useFriends();
  const [friendRequests, setFriendRequests] = useState<IGetFriendRequest[]>([]);
  const effectRan = useRef(false);

  const onGetFriendRequests = async () => {
    try {
      const res: IGetFriendRequest[] = await getFriendRequests();
      console.log(res);
      await setFriendRequests(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => {
      if (effectRan.current === false) {
        onGetFriendRequests();
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
      {friendRequests.length ? (
        <FriendRequestsTable fRequests={friendRequests} />
      ) : (
        <Text>There is no pending requests </Text>
      )}
    </Card>
  );
};

export default FriendRequestsCard;
