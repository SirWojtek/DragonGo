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
    const userExists = await this.findByUsername(username);

    if (userExists) {
      return null;
    }

    return this.userRepository.create({
      username,
      password,
    });
  }
}
