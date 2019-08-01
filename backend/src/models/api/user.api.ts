import { MinLength } from 'class-validator';

export class RegisterRequest {
  @MinLength(4)
  username: string;

  @MinLength(8)
  password: string;
}
