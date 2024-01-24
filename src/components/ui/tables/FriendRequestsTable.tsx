import { Table, ScrollArea, Group, Avatar, Text, Button } from "@mantine/core";
import { IGetFriendRequest } from "../../../models/FriendRequestResponses";

interface IFriendRequestsTableProps {
  fRequests: IGetFriendRequest[];
}

const FriendRequestsTable = (props: IFriendRequestsTableProps) => {
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
            <Button bg="green">Confirm</Button>
            <Button bg="red">Decline</Button>
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
