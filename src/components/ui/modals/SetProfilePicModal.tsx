import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import SetProfilePic from "../../user_settings/SetProfilePic";
interface ISetProfilePicModalProps {
  imageSrc: string;
  userNickname: string;
}
const SetProfilePicModal = (props: ISetProfilePicModalProps) => {
  const openSetProfilePicModal = () =>
    modals.openConfirmModal({
      title: "Update your profile picture",
      centered: true,
      children: (
        <SetProfilePic
          imageSrc={props.imageSrc}
          userNickname={props.userNickname}
        />
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "blue" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return (
    <Button onClick={openSetProfilePicModal} color="blue">
      Yes
    </Button>
  );
};

export default SetProfilePicModal;
