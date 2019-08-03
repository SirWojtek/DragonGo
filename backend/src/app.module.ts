import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MonstersModule } from './monsters/monsters.module';
import { SpawnAreasModule } from './spawn-areas/spawn-areas.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(), MonstersModule, SpawnAreasModule],
})
export class AppModule {}
