import { Table, ScrollArea, Group, Avatar, Text, Button } from "@mantine/core";
import { IGetFriendRequest } from "../../../models/FriendRequestResponses";
import { useFriends } from "../../../hooks/useFriends";
import { useState } from "react";

interface IFriendRequestsTableProps {
  fRequests: IGetFriendRequest[];
}

const FriendRequestsTable = (props: IFriendRequestsTableProps) => {
  const { confirmFriendRequest, cancelFriendRequest } = useFriends();
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

  const rows = props.fRequests.map((fRequest) => {
    return (
      <Table.Tr key={fRequest.id}>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={40} src={fRequest.profileImg} radius={26} />
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
                  onClick={() => onConfirmRequest(fRequest.id)}
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
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm" horizontalSpacing="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Options</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default FriendRequestsTable;
