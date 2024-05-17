import { useState } from "react";
import { useFriendsContext } from "../../../../context/FriendsContext";
import { Center, Container, Flex, Tabs, Text } from "@mantine/core";
import { IconFriends } from "@tabler/icons-react";
import AddFriendCard from "../../cards/AddFriendCard";
import FriendRequestsCard from "../../cards/FriendRequestsCard";
import FriendsCard from "../../cards/FriendsCard";
import classes from "./FriendsHeader.module.css";

const FriendsHeader = () => {
  const { friendsState } = useFriendsContext();
  const friendLen = friendsState.friendRequests.length;
  const tabs = ["All", `Pending (${friendLen})`, "Blocked", "Add Friend"];

  const [showCard, setShowCard] = useState("");

  const handleTabChange = (value: string) => {
    if (value === "Add Friend") {
      setShowCard("Add Friend");
    }
    if (value === `Pending (${friendLen})`) {
      setShowCard("Pending");
    }
    if (value === "All") {
      setShowCard("All");
    }
    if (value === "Blocked") {
      setShowCard("");
    }
  };

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab} onClick={() => handleTabChange(tab)}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <Center className={classes.friendsCenter}>
      <Container>
        <Flex>
          <Flex pt={5} pr={10}>
            <IconFriends stroke={2} />
            <Text>Friends</Text>
          </Flex>
          <Tabs
            variant="outline"
            visibleFrom="sm"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
        </Flex>

        {showCard === "Add Friend" && <AddFriendCard />}
        {showCard === "Pending" && <FriendRequestsCard />}
        {showCard === "All" && <FriendsCard />}
      </Container>
    </Center>
  );
};

export default FriendsHeader;
