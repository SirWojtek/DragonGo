import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MonstersModule } from './monsters/monsters.module';
import { SpawnAreasModule } from './spawn-areas/spawn-areas.module';
import { HelloModule } from './hello/hello.module';

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
