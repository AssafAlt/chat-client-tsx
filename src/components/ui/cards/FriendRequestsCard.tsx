import { useEffect } from "react";
import { Card, Text } from "@mantine/core";
import FriendRequestsTable from "../tables/FriendRequestsTable";
import { useFriendsContext } from "../../../context/FriendsContext";
import classes from "./Cards.module.css";
const FriendRequestsCard = () => {
  const { friendsState } = useFriendsContext();

  useEffect(
    () => {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [friendsState]
  );

  return (
    <Card padding="md" radius="md" className={classes.mobileCard}>
      <Text ta="center" c="cyan" hiddenFrom="sm">
        Friend Requests
      </Text>
      {friendsState.friendRequests.length ? (
        <FriendRequestsTable fRequests={friendsState.friendRequests} />
      ) : (
        <Text ff="sans-serif" fs="italic" ta="center">
          There is no pending requests{" "}
        </Text>
      )}
    </Card>
  );
};

export default FriendRequestsCard;
