import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../models/db/user.entity';
import { ServicesModule } from '../services/services.module';
import { AuthService } from './auth/auth.service';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/jwt-strategy';
import { LocalStrategy } from './auth/local-strategy';
import { WsJwtGuard } from './auth/ws-jwt.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    ServicesModule,
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
