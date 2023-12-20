import {
  Avatar,
  Text,
  Button,
  Paper,
  LoadingOverlay,
  Loader,
} from "@mantine/core";
import { useState } from "react";
import { useImages } from "../hooks/useImages";
import { ProfileImageClo } from "../models/ProfileImageClo";
import { notifications } from "@mantine/notifications";

interface SetProfileProps {
  imageSrc: string;
  text: string;
}

const SetProfile = (props: SetProfileProps) => {
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
    const image = new ProfileImageClo(profilePicture);
    try {
      await uploadProfileImage(image);
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
        <Avatar src={props.imageSrc} size={200} radius={120} mx="auto" />
        <Text ta="center" fz="lg" fw={500} mt="md">
          {props.text}
        </Text>

        <input
          type="file"
          accept="image/*"
          name="profilePicture"
          onChange={handleFileChange}
        />
        {profilePictureUrl && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={profilePictureUrl}
              alt="Profile Preview"
              className="profile-picture-preview"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
          </div>
        )}
        <Button onClick={onUpdateImage}>Update Profile Image</Button>
      </Paper>
    </>
  );
};
export default SetProfile;
/*padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;*/
