import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetMonstersRequest, Monster } from '../models/api/monsters.api';
import { MonstersService } from './monsters.service';

@Controller('monsters')
export class MonstersController {
  constructor(private monstersService: MonstersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('getMonsters')
  async getMonsters(
    @Body() getMonstersRequest: GetMonstersRequest,
  ): Promise<Monster[]> {
    const monsterIntances = await this.monstersService.findAllMonsterInstances(
      getMonstersRequest.monsterIds,
    );

    return monsterIntances.map(m => ({
      id: m.id,
      name: m.monsterMetadata.name,
      description: m.monsterMetadata.description,
      level: m.level,
    }));
  }
}
