import { Table, ScrollArea } from "@mantine/core";
import { IGetFriendRequest } from "../../../models/FriendRequestResponses";
import FriendRequestRow from "./FriendRequestRow";

const FriendRequestsTable: React.FC<{ fRequests: IGetFriendRequest[] }> = ({
  fRequests,
}) => {
  const rows = fRequests.map((fRequest) => (
    <FriendRequestRow key={fRequest.id} fRequest={fRequest} />
  ));

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
