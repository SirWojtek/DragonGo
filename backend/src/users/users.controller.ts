import {
  Body,
  Controller,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterRequest } from '../models/api/user.api';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    this.logger.debug('/users/login');
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerRequest: RegisterRequest): Promise<boolean> {
    return !!(await this.usersService.addUser(
      registerRequest.username,
      registerRequest.password,
    ));
  }
}
