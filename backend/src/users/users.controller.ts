import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { AddUserRequest } from '../models/api/user.api';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('add-user')
  async addUser(@Body() addUserRequest: AddUserRequest): Promise<boolean> {
    return !!this.usersService.addUser(
      addUserRequest.username,
      addUserRequest.password,
    );
  }
}
