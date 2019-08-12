import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getCenter, computeDestinationPoint } from 'geolib';
import { SpawnAreaEnity } from '../models/db/spawn-area.entity';
import { Repository } from 'typeorm';
import { Rect, LatLng } from '../models/api/spawn-areas.api';
import { MapFragmentEntity } from '../models/db/map-fragment.entity';
import { toPolygon } from '../utils/geojson';
import { GoogleMapsService, IPlace } from '../services/google-maps.service';
import { ConfigService, ConfigKeyEnum } from '../services/config.service';

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
  private logger = new Logger(SpawnAreasService.name);

  constructor(
    @InjectRepository(SpawnAreaEnity)
    private spawnAreaRepository: Repository<SpawnAreaEnity>,
    @InjectRepository(MapFragmentEntity)
    private mapFragmentEntityRepository: Repository<MapFragmentEntity>,
    private configService: ConfigService,
    private googleMapsService: GoogleMapsService,
  ) {}

  public findSpawnAreasForLocation(
    location: LatLng,
  ): Promise<SpawnAreaEnity[]> {
    const radius = this.configService.get(
      ConfigKeyEnum.SPAWN_AREAS_LOCATION_RADIUS,
    ) as number;
    const northeast = computeDestinationPoint(location, radius, 45);
    const southwest = computeDestinationPoint(location, radius, 225);

    return this.findSpawnAreasForRegion({
      northeast: { lat: northeast.latitude, lng: northeast.longitude },
      southwest: { lat: southwest.latitude, lng: southwest.longitude },
    });
  }

  private async findSpawnAreasForRegion(
    region: Rect,
  ): Promise<SpawnAreaEnity[]> {
    const mapFragments: MapFragmentEntity[] = await this.mapFragmentEntityRepository
      .query(getMapFragmentsForRegionQuery, [toPolygon(region)])
      .then((fragments: any[]) =>
        this.mapFragmentEntityRepository.create(fragments),
      );

    if (!mapFragments.length) {
      this.logger.log('Could not find map fragment in DB, calling google maps');
      return this.fetchFragment(region);
    } else {
      const fragmentIds = mapFragments.map(f => f.id);
      return this.spawnAreaRepository.find({
        where: { mapFragmentId: fragmentIds },
      });
    }
  }

  private async fetchFragment(region: Rect): Promise<SpawnAreaEnity[]> {
    const center = getCenter([region.northeast, region.southwest]);
    if (!center) {
      throw new Error('Cannot get center of the region');
    }

    const places = await this.googleMapsService.getPlaces(
      { lat: center.latitude, lng: center.longitude },
      this.configService.get(
        ConfigKeyEnum.SPAWN_AREAS_MAP_FRAGMENT_SIZE,
      ) as number,
    );
    const mapFragment = await this.createMapFragment({
      lat: center.latitude,
      lng: center.longitude,
    });

    const spawnAreas = await places.map(place =>
      this.createSpawnArea(place, mapFragment),
    );
    return this.spawnAreaRepository.save(spawnAreas);
  }

  private createMapFragment(center: LatLng): Promise<MapFragmentEntity> {
    const fragmentSize = this.configService.get(
      ConfigKeyEnum.SPAWN_AREAS_MAP_FRAGMENT_SIZE,
    ) as number;
    const northeast = computeDestinationPoint(center, fragmentSize, 45);
    const southwest = computeDestinationPoint(center, fragmentSize, 225);
    const coords = toPolygon({
      northeast: { lat: northeast.latitude, lng: northeast.longitude },
      southwest: { lat: southwest.latitude, lng: southwest.longitude },
    });
    const mapFragment = this.mapFragmentEntityRepository.create({
      coords,
    });

    return this.mapFragmentEntityRepository.save(mapFragment);
  }

  private createSpawnArea(
    place: IPlace,
    mapFragment: MapFragmentEntity,
  ): SpawnAreaEnity {
    return this.spawnAreaRepository.create({
      name: place.name,
      coords: toPolygon(place.viewport),
      mapFragment,
    });
  }
}
