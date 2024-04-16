import { IGetFriendRequest } from "./FriendRequestResponses";
import { IFriendIsOnline } from "./FriendWithStatus";
import { MessageType } from "./MessageType";

export interface INotification {
  message: string;
  messageType: MessageType;
  friend: IFriendIsOnline;
  frequest: IGetFriendRequest;
}
