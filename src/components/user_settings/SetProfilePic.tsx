import { useState } from "react";
import {
  Avatar,
  Button,
  Loader,
  LoadingOverlay,
  Paper,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useImages } from "../../hooks/useImages";
import { ProfileImageClo } from "../../models/ProfileImageClo";

interface ISetProfilePicProps {
  imageSrc: string;
  userNickname: string;
}
const SetProfilePic = (props: ISetProfilePicProps) => {
  const { uploadProfileImage } = useImages();
  const [profilePicture, setProfilePicture] = useState<File | undefined>(
    undefined
  );
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setProfilePicture(file);
      setProfilePictureUrl(URL.createObjectURL(file));
    }
  };
  const onUpdateImage = async () => {
    setIsLoading(true);
    const profileImage = new ProfileImageClo(profilePicture);
    try {
      await uploadProfileImage(profileImage);
      notifications.show({
        title: "Update Profile",
        message: "Profile Picture uploaded successfully",
        autoClose: 2000,
      });
    } catch (error) {
      notifications.show({
        title: "Upload failed!",
        message: "Please try again later",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && (
        <LoadingOverlay
          visible={true}
          loaderProps={{ children: <Loader color="blue" /> }}
        />
      )}
      <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
        <Avatar
          src={profilePictureUrl ? profilePictureUrl : props.imageSrc}
          size={120}
          radius={120}
          mx="auto"
        />
        <Text ta="center" fz="lg" fw={500} mt="md">
          {props.userNickname}
        </Text>
        <input
          type="file"
          accept="image/*"
          name="profilePicture"
          onChange={handleFileChange}
        />

        <Button color="blue" fullWidth mt="md" onClick={onUpdateImage}>
          Update Profile Picture
        </Button>
      </Paper>
    </>
  );
};
export default SetProfilePic;
