import { useState } from "react";
import { Center, Container, Tabs } from "@mantine/core"; // Assuming Mantine provides Input and Button components
import AddFriendCard from "../../cards/AddFriendCard";
import classes from "../Header.module.css";

const HeaderTabs = () => {
  const tabs = ["Online", "All", "Pending", "Blocked", "Add Friend"];

  const [showAddFriendCard, setShowAddFriendCard] = useState(false);

  const handleTabChange = (value: string) => {
    if (value === "Add Friend") {
      // Display search bar when "Add Friend" tab is clicked
      setShowAddFriendCard(true);
    } else {
      // Hide search bar for other tabs
      setShowAddFriendCard(false);
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
        {showAddFriendCard && <AddFriendCard />}
      </Container>
    </Center>
  );
};

export default HeaderTabs;
