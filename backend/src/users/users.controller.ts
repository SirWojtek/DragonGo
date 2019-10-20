import {
  Body,
  Controller,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginResponse, RegisterRequest } from '../../../api/user.api';
import { UserEntity } from '../models/db/user.entity';
import { ConfigKeyEnum, ConfigService } from '../services/config.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: { user: UserEntity }): Promise<LoginResponse> {
    this.logger.debug('/users/login');

    const accessToken = await this.authService.login(req.user);
    const maxRange = this.configService.get(
      ConfigKeyEnum.USER_RADIUS,
    ) as number;

    return {
      accessToken,
      user: {
        id: req.user.id,
        username: req.user.username,
        level: req.user.level,
        maxRange,
      },
    };
  }

  @Post('register')
  async register(@Body() registerRequest: RegisterRequest): Promise<boolean> {
    return !!(await this.usersService.addUser(
      registerRequest.username,
      registerRequest.password,
    ));
  }
}
