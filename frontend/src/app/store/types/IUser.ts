import { IInventoryInfo } from './IInventoryInfo';
import { ILevelInfo } from './ILevelInfo';
import { ILocation } from './ILocation';
import { IStats } from './IStats';

export interface IUser {
  name?: string;
  password?: string;
  logoUrl?: string;
  location: ILocation;
  maxRange: number;
  levelInfo: ILevelInfo;
  stats: IStats;
  inventory: IInventoryInfo;
}
