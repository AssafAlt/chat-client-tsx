export interface ICurrentChatMessage {
  sender: string;
  content: string;
  time: string;
  date: string;
}

export interface IChatMessage extends ICurrentChatMessage {
  room: string;
  recipient: string;
}
