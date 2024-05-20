import React from "react";
import { Button, Text } from "@mantine/core";
import { FriendRequestStatus } from "../../../../models/FriendRequestStatus";
import { useFriends } from "../../../../hooks/useFriends";
interface IStatusCompProps {
  requestId: number | null;
  status: string;
  userId: number;
}
/*<Button
                onClick={() =>
                  onConfirmRequest(fRequest.requestId).then(() =>
                    isFriendOnline(fRequest.nickname)
                  )
                }
                bg="green"
              >
                Confirm
              </Button>
              <Button onClick={() => onCancelRequest(fRequest.requestId)} bg="red">
                Decline
              </Button>*/

const StatusComp: React.FC<IStatusCompProps> = ({
  requestId,
  status,
  userId,
}) => {
  const { confirmFriendRequest, cancelFriendRequest, isFriendOnline } =
    useFriends();
  return (
    <>
      {status === FriendRequestStatus.WAITING && (
        <>
          <Text c="black">Pending</Text>
          <Button bg="red">Cancel</Button>
        </>
      )}
      {status === FriendRequestStatus.PENDING && <Text c="black">Waiting</Text>}
      {status === FriendRequestStatus.FRIENDS && <Text c="black">Friends</Text>}
      {status === FriendRequestStatus.NOT_FRIENDS && (
        <Button bg="green">Send Friend Request</Button>
      )}
    </>
  );
};

export default StatusComp;
