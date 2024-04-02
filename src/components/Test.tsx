import React, { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import { FriendWithStatus } from "../models/FriendWithStatus";

const Test = () => {
  const { socketState } = useSocketContext();
  const [friendLists, setFriendsList] = useState<FriendWithStatus[]>([]);
  useEffect(() => {
    setFriendsList(socketState.connectedFriends);
  }, [socketState]);
  return (
    <div>
      <ul>
        {friendLists.map((friend, index) => (
          <li key={index}>
            <p>Nickname: {friend.nickname}</p>
            <p>ProfileImg: {friend.profileImg}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
