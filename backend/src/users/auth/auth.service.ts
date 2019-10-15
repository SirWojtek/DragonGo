import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../..//models/db/user.entity';
import { compare } from '../../utils/bcrypt';
import { UsersService } from '../users.service';

export interface JwtPayload {
  username: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<UserEntity> | null> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return null;
    }

    const passwordMatch = await compare(pass, user.password);

    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async login(user: UserEntity): Promise<{ access_token: string }> {
    const payload: JwtPayload = { username: user.username, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }
}
