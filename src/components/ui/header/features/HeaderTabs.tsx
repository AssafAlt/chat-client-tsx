import { useState } from "react";
import { Center, Container, Tabs } from "@mantine/core"; // Assuming Mantine provides Input and Button components
import AddFriendCard from "../../cards/AddFriendCard";
import classes from "../Header.module.css";
import FriendRequestsCard from "../../cards/FriendRequestsCard";

const HeaderTabs = () => {
  const tabs = ["Online", "All", "Pending", "Blocked", "Add Friend"];

  const [showCard, setShowCard] = useState("");

  const handleTabChange = (value: string) => {
    if (value === "Add Friend") {
      setShowCard("Add Friend");
    }
    if (value === "Pending") {
      setShowCard("Pending");
    }
  };

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab} onClick={() => handleTabChange(tab)}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <Center>
      <Container size="md">
        <Tabs
          defaultValue="Home"
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
        {showCard === "Add Friend" && <AddFriendCard />}
        {showCard === "Pending" && <FriendRequestsCard />}
      </Container>
    </Center>
  );
};

export default HeaderTabs;
