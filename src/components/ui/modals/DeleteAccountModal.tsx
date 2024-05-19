import { modals } from "@mantine/modals";
import { Button, Menu, rem, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useAuth } from "../../../hooks/useAuth";
import { notifications } from "@mantine/notifications";
const DeleteAccountModal = () => {
  const { deleteUser } = useAuth();
  const onDeleteAccount = async () => {
    try {
      await deleteUser();
      notifications.show({
        title: "Account was deleted",
        message: "Account was deleted successfully",
        autoClose: 3000,
      });
    } catch (error) {
      notifications.show({
        title: "Delete failed!",
        message: "Try again later",
        color: "red",
      });
    }
  };

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete your profile",

      centered: true,

      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and permanent!
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: onDeleteAccount,
    });
  return (
    <Button
      color="red"
      onClick={openDeleteModal}
      leftSection={
        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      }
    >
      Delete account
    </Button>
  );
};

export default DeleteAccountModal;
