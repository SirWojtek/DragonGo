import * as jwt from 'jsonwebtoken';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { jwtConstants } from './constants';
import { JwtPayload } from './auth.service';
import { UserEntity } from '../../models/db/user.entity';
import { UsersService } from '../users.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const authorizationHeader: string = client.handshake.headers.authorization;
    if (!authorizationHeader) {
      return false;
    }

    const token = authorizationHeader.replace('Bearer ', '');
    const jwtPayload = jwt.verify(token, jwtConstants.secret) as JwtPayload;
    if (!jwtPayload) {
      return false;
    }

    const user: UserEntity = await this.usersService.findByUsername(
      jwtPayload.username,
    );
    if (!user) {
      return false;
    }

    context.switchToWs().getData().user = user;
    return true;
  }
}
