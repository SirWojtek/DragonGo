import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/db/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<UserEntity | null> {
    const lowerCaseUsername = username.toLowerCase();
    return this.userRepository.findOne({
      where: { username: lowerCaseUsername },
    });
  }

  async addUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const effectiveUsername = username.toLowerCase().trim();
    const userExists = await this.findByUsername(effectiveUsername);

    if (userExists) {
      return null;
    }

    const user = this.userRepository.create({
      username: effectiveUsername,
      password,
    });

    return this.userRepository.save(user);
  }
}
