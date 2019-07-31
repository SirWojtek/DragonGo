import { MinLength } from 'class-validator';

export class AddUserRequest {
  @MinLength(4)
  username: string;

  @MinLength(8)
  password: string;
}
