import { ILocation } from './ILocation';
import { IViewport } from './Iviewport';

export interface ISpawnArea {
  id: string;
  name: string;
  viewport: IViewport;
  monsters: Array<{
    id: string;
    location: ILocation;
  }>;
}
