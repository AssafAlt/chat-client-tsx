import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const FriendsDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="top"
        size="50%"
        padding="sm"
        title="Friends Header"
        zIndex={1000000}
      ></Drawer>
      <Button hiddenFrom="sm" onClick={open}>
        Open drawer
      </Button>
    </>
  );
};

export default FriendsDrawer;
