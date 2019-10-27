import { ILocation } from './ILocation';

export interface IMonster {
  id: string;
  name: string;
  level: number;
  location: ILocation;
  spawnAreaId: string;
}
