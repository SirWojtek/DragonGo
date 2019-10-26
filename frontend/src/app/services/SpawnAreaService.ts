import { Observable, of } from 'rxjs';
import { ILocation } from '../store/types/ILocation';

import { GetSpawnAreas, SpawnArea } from '../../../../api/spawn-areas.api';
import { fetchWrapper } from '../utils/fetch-utils';

const SpawnAreaService = {
  getSpawnAreas(loc: ILocation | undefined): Observable<SpawnArea[]> {
    if (!loc || !loc.lat || !loc.lng) {
      return of([]);
    }

    const request: GetSpawnAreas = {
      location: {
        lat: loc.lat,
        lng: loc.lng
      }
    };

    return fetchWrapper('/api/spawn-areas/get-spawn-areas', {
      body: JSON.stringify(request)
    });
  }
};

export default SpawnAreaService;
