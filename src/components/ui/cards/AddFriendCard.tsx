import { useState } from "react";
import {
  Autocomplete,
  Card,
  rem,
  List,
  ListItem,
  Avatar,
  Text,
  Flex,
  Button,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useFriends } from "../../../hooks/useFriends";
import { ISearchResponse } from "../../../models/SearchResponse";
import classes from "./Cards.module.css";
const AddFriendCard = () => {
  const { searchUser } = useFriends();
  const [searchPrefix, setSearchPrefix] = useState<string>("");
  const [users, setUsers] = useState<ISearchResponse[]>([]);

  const onChangeSearch = (value: string) => {
    setSearchPrefix(value);
  };
  const onSearch = async () => {
    try {
      const res = await searchUser(searchPrefix);
      await setUsers(res);
    } catch (error) {
      console.log(error);
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
      <List py="sm">
        {users.map((user) => (
          <Flex key={user.nickname} justify="space-between" py="sm">
            <Avatar src={user.profileImg} />
            <Text ff="sans-serif" fs="italic">
              {user.nickname}
            </Text>
            <Button bg="green">Add Friend</Button>
          </Flex>
        ))}
      </List>
    </Card>
  );
};

export default AddFriendCard;
