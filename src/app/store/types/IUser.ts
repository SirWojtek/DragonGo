import {IInventoryInfo} from './IInventoryInfo';
import {ILevelInfo} from './ILevelInfo';
import {ILocation} from './ILocation';

export interface IUser {
  name: string;
  logoUrl?: string;
  location: ILocation;
  maxRange: number;
  levelInfo: ILevelInfo;
  inventory: IInventoryInfo;
}
