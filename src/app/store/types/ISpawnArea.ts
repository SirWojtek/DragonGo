import {IViewport} from './Iviewport';

export interface ISpawnArea {
  id: string;
  name: string;
  viewport: IViewport;
  monsterIds: string[];
}
