export interface ICredentials {
  username: string;
  password: string;
  rememberCredentials: boolean;
  loginError?: string;
  accessToken?: string;
}
