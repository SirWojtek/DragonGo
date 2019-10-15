import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloModule } from './hello/hello.module';
import { MonstersModule } from './monsters/monsters.module';
import { SpawnAreasModule } from './spawn-areas/spawn-areas.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(),
    MonstersModule,
    SpawnAreasModule,
    HelloModule,
  ],
})
export class AppModule {}
