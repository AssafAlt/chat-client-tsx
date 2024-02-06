import { useState } from "react";
import {
  Autocomplete,
  Card,
  rem,
  List,
  Avatar,
  Text,
  Flex,
  Button,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useFriends } from "../../../hooks/useFriends";
import { ISearchResponse } from "../../../models/FriendRequestResponses";
import classes from "./Cards.module.css";

const AddFriendCard = () => {
  const { searchUser, sendFriendRequest } = useFriends();
  const [searchPrefix, setSearchPrefix] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [requestStatus, setRequestStatus] = useState("Loading...");
  const [users, setUsers] = useState<ISearchResponse[]>([]);

  const onChangeSearch = (value: string) => {
    setSearchPrefix(value);
  };
  const onSearch = async () => {
    try {
      setIsSearched(true);
      const res = await searchUser(searchPrefix);
      await setUsers(res);
    } catch (error) {
      console.log(error);
    }
  };
  const onSendFrinedRequest = async (recieverId: number) => {
    setIsLoading(true);
    try {
      const res = await sendFriendRequest(recieverId);
      if (res) {
        setRequestStatus("Request was sent");
      }
    } catch (error) {
      setRequestStatus("Request was failed!");
    }
  };
  return (
    <Card padding="md" radius="md" bg="cyan">
      <Autocomplete
        className={classes.searchBar}
        value={searchPrefix}
        onChange={onChangeSearch}
        placeholder="Search for users..."
        leftSection={
          <IconSearch
            onClick={onSearch}
            cursor="pointer"
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        visibleFrom="xs"
      />
      {isSearched ? (
        users.length ? (
          <List py="sm">
            {users.map((user) => (
              <Flex key={user.userId} justify="space-between" py="sm" px="sm">
                <Avatar src={user.profileImg} />
                <Text ff="sans-serif" fs="italic">
                  {user.nickname}
                </Text>
                {!isLoading ? (
                  <Button
                    bg="green"
                    onClick={() => onSendFrinedRequest(user.userId)}
                  >
                    Send Friend Request
                  </Button>
                ) : (
                  <Text c="white">{requestStatus}</Text>
                )}
              </Flex>
            ))}
          </List>
        ) : (
          <Text>No users found</Text>
        )
      ) : null}
    </Card>
  );
};

export default AddFriendCard;
