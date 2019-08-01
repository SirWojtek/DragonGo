import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetMonstersRequest } from '../models/api/monsters.api';
import { MonsterEntity } from '../models/db/monster.entity';

@Controller('monsters')
export class MonstersController {
  @UseGuards(AuthGuard('jwt'))
  @Post('getMonsters')
  async getMonsters(
    @Body() getMonstersRequest: GetMonstersRequest,
  ): Promise<MonsterEntity[]> {
    return [];
  }
}
