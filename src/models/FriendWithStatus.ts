export enum MessageType {
  JOIN = "JOIN",
  LEAVE = "LEAVE",
}

export class FriendWithStatus {
  profileImg: string;
  nickname: string;

  constructor(profileImg: string, nickname: string) {
    this.profileImg = profileImg;
    this.nickname = nickname;
  }
}
export interface IFriendStatusUpdate extends FriendWithStatus {
  messageType: MessageType;
}
