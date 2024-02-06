interface IFriendResponse {
  nickname: string;
  profileImg: string;
}

export interface ISearchResponse extends IFriendResponse {
  userId: number;
}

export interface IGetFriendRequest extends IFriendResponse {
  id: number;
  date: string;
}
