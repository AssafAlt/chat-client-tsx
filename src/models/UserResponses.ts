export interface LoginResponse {
  userNickname: string;
  imagePath: string;
  firstLogin: boolean;
}

export interface CloudinaryImageResponse {
  url: string;
}

export interface UpdateFirstLoginResponse {
  firstLogin: boolean;
}

export interface UpdateProfileImageResponse extends UpdateFirstLoginResponse {
  imagePath: string;
}
