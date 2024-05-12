import { Button, Flex, Text, Avatar } from "@mantine/core";
import React, { useState } from "react";
import { ISearchResponse } from "../../../models/FriendRequestResponses";
import { useFriends } from "../../../hooks/useFriends";

const AddFriendCardRow: React.FC<{ searchedUser: ISearchResponse }> = ({
  searchedUser,
}) => {
  const { sendFriendRequest } = useFriends();
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState("Loading...");
  const onSendFrinedRequest = async (recieverId: number) => {
    setIsLoading(true);
    try {
      const res = await sendFriendRequest(recieverId);
      if (res) {
        setRequestStatus("Request was sent");
      }
    } catch (error) {
      setRequestStatus("Request was failed!");
    }
  };
  return (
    <Flex justify="space-between" py="sm" px="sm">
      <Avatar src={searchedUser.profileImg} />
      <Text ff="sans-serif" fs="italic">
        {searchedUser.nickname}
      </Text>
      {!isLoading ? (
        <Button
          bg="green"
          onClick={() => onSendFrinedRequest(searchedUser.userId)}
        >
          Send Friend Request
        </Button>
      ) : (
        <Text c="white">{requestStatus}</Text>
      )}
    </Flex>
  );
};

export default AddFriendCardRow;
