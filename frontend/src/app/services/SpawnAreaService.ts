import { Observable, of } from 'rxjs';
import { ILocation } from '../store/types/ILocation';
import { ISpawnArea } from '../store/types/ISpawnArea';
import { spawnAreas } from './data/spawnAreas';

const SpawnAreaService = {
  getSpawnAreas(coords: ILocation): Observable<ISpawnArea[]> {
    return of(spawnAreas);
  }
};

export default SpawnAreaService;
