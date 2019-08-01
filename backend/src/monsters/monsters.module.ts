import { Module } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';

@Module({
  providers: [MonstersService],
  controllers: [MonstersController],
})
export class MonstersModule {}
