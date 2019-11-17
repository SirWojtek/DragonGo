import { Observable, of } from 'rxjs';
import { ILocation } from '../store/types/ILocation';

import { GetSpawnAreas, SpawnArea } from '../../../../api/spawn-areas.api';
import { fetchPostWrapper } from '../utils/fetch-utils';

const SpawnAreaService = {
  getSpawnAreas(
    loc: ILocation | undefined,
    accessToken: string
  ): Observable<SpawnArea[] | undefined> {
    if (!loc || !loc.lat || !loc.lng) {
      return of([]);
    }

    const request: GetSpawnAreas = {
      location: {
        lat: loc.lat,
        lng: loc.lng
      }
    };

    return fetchPostWrapper(
      '/api/spawn-areas/get-spawn-areas',
      request,
      accessToken
    );
  }
};

export default SpawnAreaService;
