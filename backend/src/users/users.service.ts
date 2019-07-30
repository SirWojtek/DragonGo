import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  users: User[] = [
    {
      id: '1',
      email: 'test@test.com',
      password: 'test',
    },
    {
      id: '2',
      email: 'example@example.com',
      password: 'example',
    },
  ];

  async findOne(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email);
  }
}
