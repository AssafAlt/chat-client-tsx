import React, { useState } from "react";
import { Avatar, Button, Group, Table, Text } from "@mantine/core";
import { IGetFriendRequest } from "../../../models/FriendRequestResponses";
import { useFriends } from "../../../hooks/useFriends";
import { useDisplay } from "../../../hooks/useDisplay";

const FriendRequestRow: React.FC<{ fRequest: IGetFriendRequest }> = ({
  fRequest,
}) => {
  const { confirmFriendRequest, cancelFriendRequest, isFriendOnline } =
    useFriends();
  const { chooseOverlayImage } = useDisplay();
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState("Loading...");
  const onConfirmRequest = async (friendRequestId: number) => {
    setIsLoading(true);
    try {
      await confirmFriendRequest(friendRequestId);
      setRequestStatus("Confirmed");
    } catch (error) {
      setRequestStatus("Confirmation was failed!");
    }
  };
  const onCancelRequest = async (friendRequestId: number) => {
    setIsLoading(true);
    try {
      await cancelFriendRequest(friendRequestId);
      setRequestStatus("Declined");
    } catch (error) {
      setRequestStatus("Declination was failed!");
    }
  };
  return (
    <Table.Tr>
      <Table.Td>
        <Group gap="sm">
          <Avatar
            size={40}
            src={fRequest.profileImg}
            radius={26}
            onClick={() => chooseOverlayImage(fRequest.profileImg)}
          />
          <Text size="sm" fw={500}>
            {fRequest.nickname}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td ta="left">{fRequest.date}</Table.Td>
      <Table.Td ta="left">
        <Group gap="xs">
          {!isLoading ? (
            <>
              <Button
                onClick={() =>
                  onConfirmRequest(fRequest.id).then(() =>
                    isFriendOnline(fRequest.nickname)
                  )
                }
                bg="green"
              >
                Confirm
              </Button>
              <Button onClick={() => onCancelRequest(fRequest.id)} bg="red">
                Decline
              </Button>
            </>
          ) : (
            <Text c="white">{requestStatus}</Text>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

export default FriendRequestRow;
