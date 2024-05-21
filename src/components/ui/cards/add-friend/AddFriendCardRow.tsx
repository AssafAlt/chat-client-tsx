import { Flex, Text, Avatar } from "@mantine/core";
import React, { useState } from "react";
import { ISearchResponse } from "../../../../models/FriendRequestResponses";

import { useDisplay } from "../../../../hooks/useDisplay";
import StatusComp from "./StatusComp";

const AddFriendCardRow: React.FC<{ searchedUser: ISearchResponse }> = ({
  searchedUser,
}) => {
  const { chooseOverlayImage } = useDisplay();
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState("Loading...");

  return (
    <Flex justify="space-between" py="sm" px="sm" style={{ width: "100%" }}>
      <Avatar
        src={searchedUser.profileImg}
        onClick={() => chooseOverlayImage(searchedUser.profileImg)}
      />
      <Text ff="sans-serif" fs="italic">
        {searchedUser.nickname}
      </Text>
      {!isLoading ? (
        <StatusComp
          status={searchedUser.status}
          requestId={searchedUser.requestId}
          userId={searchedUser.userId}
          setIsLoading={setIsLoading}
          setRequestStatus={setRequestStatus}
        />
      ) : (
        <Text c="white">{requestStatus}</Text>
      )}
    </Flex>
  );
};

export default AddFriendCardRow;
