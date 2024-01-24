import { useEffect, useRef, useState } from "react";
import { Card, List, Avatar, Text, Flex, Button } from "@mantine/core";
import { useFriends } from "../../../hooks/useFriends";
import { IGetFriendRequest } from "../../../models/FriendRequestResponses";
import classes from "./Cards.module.css";
import { notifications } from "@mantine/notifications";
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

  useEffect(() => {
    if (effectRan.current === false) {
      onGetFriendRequests();
    }

    return () => {
      console.log("unmounted");
      effectRan.current = true;
    };
  }, []);

  return (
    <Card padding="md" radius="md" bg="cyan">
      {friendRequests && <FriendRequestsTable fRequests={friendRequests} />}
    </Card>
  );
};

export default FriendRequestsCard;
