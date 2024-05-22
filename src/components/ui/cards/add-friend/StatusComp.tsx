import React from "react";
import { Button, Text } from "@mantine/core";
import { FriendRequestStatus } from "../../../../models/FriendRequestStatus";
import { useFriends } from "../../../../hooks/useFriends";
import classes from "./AddCard.module.css";

interface IStatusCompProps {
  requestId: number | null;
  status: string;
  userId: number;
  setIsLoading: (value: boolean) => void;
  setRequestStatus: (value: string) => void;
}

const StatusComp: React.FC<IStatusCompProps> = ({
  requestId,
  status,
  userId,
  setIsLoading,
  setRequestStatus,
}) => {
  const { cancelFriendRequestBySender, sendFriendRequest } = useFriends();
  const onSendFrinedRequest = async () => {
    setIsLoading(true);
    try {
      await sendFriendRequest(userId);

      setRequestStatus("Request was sent");
    } catch (error) {
      setRequestStatus("Request was failed!");
    }
  };
  const onCancelRequestBySender = async () => {
    setIsLoading(true);
    try {
      if (requestId) {
        await cancelFriendRequestBySender(requestId);
        setRequestStatus("Cancelled");
      }
    } catch (error) {
      console.log(error);
      setRequestStatus("Failed to Cancel");
    }
  };
  return (
    <>
      {status === FriendRequestStatus.WAITING && (
        <>
          <Text c="black" className={classes.statusText}>
            Pending
          </Text>
          <Button
            className={classes.addButton}
            bg="red"
            onClick={onCancelRequestBySender}
          >
            Cancel
          </Button>
        </>
      )}
      {status === FriendRequestStatus.PENDING && <Text c="black">Waiting</Text>}
      {status === FriendRequestStatus.FRIENDS && <Text c="black">Friends</Text>}
      {status === FriendRequestStatus.NOT_FRIENDS && (
        <Button
          bg="green"
          className={classes.addButton}
          onClick={onSendFrinedRequest}
        >
          Add Friend
        </Button>
      )}
    </>
  );
};

export default StatusComp;
