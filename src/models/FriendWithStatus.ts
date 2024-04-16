import { MessageType } from "./MessageType";

export class FriendWithStatus {
  profileImg: string;
  nickname: string;

  constructor(profileImg: string, nickname: string) {
    this.profileImg = profileImg;
    this.nickname = nickname;
  }
}
export interface IFriendStatusUpdate {
  nickname: string;
  messageType: MessageType;
}

export interface IFriendMap {
  [nickname: string]: string;
}

export interface IFriendsWithStatus {
  onlineFriends: IFriendMap;
  offlineFriends: IFriendMap;
}
export interface IFriendIsOnline {
  profileImg: string;
  nickname: string;
  isOnline: boolean;
}
