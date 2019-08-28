import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local-strategy';
import { JwtStrategy } from './auth/jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../models/db/user.entity';
import { WsJwtGuard } from './auth/ws-jwt.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    WsJwtGuard,
  ],
  controllers: [UsersController],
  exports: [UsersService, WsJwtGuard],
})
export class UsersModule {}
