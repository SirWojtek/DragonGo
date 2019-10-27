import { IMonster } from './IMonster';
import { IViewport } from './Iviewport';

export interface ISpawnArea {
  id: string;
  name: string;
  viewport: IViewport;
  monsters: IMonster[];
}
