import { useState } from "react";
import { Autocomplete, Card, rem, List, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useFriends } from "../../../../hooks/useFriends";
import { ISearchResponse } from "../../../../models/FriendRequestResponses";
import classes from "../Cards.module.css";
import AddFriendCardRow from "./AddFriendCardRow";

const AddFriendCard = () => {
  const { searchUser } = useFriends();
  const [searchPrefix, setSearchPrefix] = useState<string>("");
  const [isSearched, setIsSearched] = useState(false);
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

  return (
    <Card padding="md" radius="md" className={classes.mobileCard}>
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
      />
      {isSearched ? (
        users.length ? (
          <List py="sm">
            {users.map((user) => (
              <AddFriendCardRow key={user.userId} searchedUser={user} />
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
