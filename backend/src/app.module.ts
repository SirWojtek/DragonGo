import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MonstersModule } from './monsters/monsters.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(), MonstersModule],
})
export class AppModule {}
