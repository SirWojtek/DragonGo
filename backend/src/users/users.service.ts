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
    return this.userRepository.findOne({ where: { username } });
  }

  async addUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const lowerCaseUsername = username.toLowerCase();
    const userExists = await this.findByUsername(lowerCaseUsername);

    if (userExists) {
      return null;
    }

    const user = await this.userRepository.create({
      username: lowerCaseUsername,
      password,
    });

    return this.userRepository.save(user);
  }
}
