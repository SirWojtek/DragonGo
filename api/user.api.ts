import { MinLength } from "class-validator";

export class User {
  id: string;
  username: string;
  level: number;
}

export class RegisterRequest {
  @MinLength(4)
  username: string;

  @MinLength(8)
  password: string;
}

export class LoginResponse {
  accessToken: string;
  user: User;
}
