export interface LoginForm {
  username: string;
  password: string;
}
export interface RegisterForm extends LoginForm {
  profileImg: string;
}
