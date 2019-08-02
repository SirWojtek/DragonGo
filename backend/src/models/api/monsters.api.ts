export class GetMonstersRequest {
  monsterIds: string[];
}

export class Monster {
  id: string;
  name: string;
  description: string;
  level: number;
}
