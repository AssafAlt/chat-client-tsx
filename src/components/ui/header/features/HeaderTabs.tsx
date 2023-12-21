import { Center, Container, Tabs } from "@mantine/core";

import classes from "../Header.module.css";
const HeaderTabs = () => {
  const tabs = ["Online", "All", "Pending", "Blocked", "Add Friend"];

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
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
      </Container>
    </Center>
  );
};

export default HeaderTabs;
