import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetMonstersRequest, Monster } from '../../../api/monsters.api';
import { toMonster } from '../utils/mappers';
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

    return monsterIntances.map(toMonster);
  }
}
