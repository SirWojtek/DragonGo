import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from '../../models/db/user.entity';
import { ConfigKeyEnum, ConfigService } from '../../services/config.service';
import { UsersService } from '../users.service';
import { JwtPayload } from './auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const authorizationHeader: string = client.handshake.headers.authorization;
    if (!authorizationHeader) {
      return false;
    }

    if (!this.configService.get(ConfigKeyEnum.USE_JWT)) {
      // NOTE: for test envs, inject user from Authorization header
      context.switchToWs().getData().user = JSON.parse(authorizationHeader);
      return true;
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
