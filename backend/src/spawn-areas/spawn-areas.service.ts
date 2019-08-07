import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpawnAreaEnity } from '../models/db/spawn-area.entity';
import { Repository } from 'typeorm';
import { Rect } from '../models/api/spawn-areas.api';
import { MapFragmentEntity } from '../models/db/map-fragment.entity';
import { toPolygon } from '../utils/geojson';

const getMapFragmentsForRegionQuery = `
select with_union.id, with_union.coords
from (
  select
    fr.id,
    fr.coords,
    (
      select st_union(coords)
      from map_fragment as un
      where st_intersects(un.coords, st_geomfromgeojson($1))
    ) u
    from map_fragment as fr
    where st_intersects(fr.coords, st_geomfromgeojson($1))
) as with_union
where st_contains(with_union.u, st_geomfromgeojson($1));
`;

@Injectable()
export class SpawnAreasService {
  constructor(
    @InjectRepository(SpawnAreaEnity)
    private spawnAreaRepository: Repository<SpawnAreaEnity>,
    @InjectRepository(MapFragmentEntity)
    private mapFragmentEntity: Repository<MapFragmentEntity>,
  ) {}

  async findSpawnAreasForRegion(region: Rect): Promise<SpawnAreaEnity[]> {
    const mapFragments: MapFragmentEntity[] = await this.mapFragmentEntity.query(
      getMapFragmentsForRegionQuery,
      [toPolygon(region)],
    );

    return [];
  }
}
