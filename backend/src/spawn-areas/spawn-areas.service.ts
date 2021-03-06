import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { computeDestinationPoint, getCenter, getDistance } from 'geolib';
import { Repository } from 'typeorm';
import { LatLng, Rect } from '../../../api/spawn-areas.api';
import { MapFragmentEntity } from '../models/db/map-fragment.entity';
import { MonsterInstanceEntity } from '../models/db/monster-instance.entity';
import { SpawnAreaEntity } from '../models/db/spawn-area.entity';
import { ConfigKeyEnum, ConfigService } from '../services/config.service';
import { GoogleMapsService, IPlace } from '../services/google-maps.service';
import { toPolygon, toRect } from '../utils/geojson';
import { toSpawnAreaEntity } from '../utils/mappers';

const getMapFragmentsForRegionQuery = `
select with_union.id
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
    @InjectRepository(SpawnAreaEntity)
    private spawnAreaRepository: Repository<SpawnAreaEntity>,
    @InjectRepository(MapFragmentEntity)
    private mapFragmentEntityRepository: Repository<MapFragmentEntity>,
    private configService: ConfigService,
    private googleMapsService: GoogleMapsService,
  ) {}

  async findSpawnAreasForLocation(
    location: LatLng,
  ): Promise<SpawnAreaEntity[]> {
    const radius = this.configService.get(
      ConfigKeyEnum.SPAWN_AREAS_LOCATION_RADIUS,
    ) as number;
    this.logger.debug('findSpawnAreasForLocation: ' + JSON.stringify(location));
    const northeast = computeDestinationPoint(location, radius, 45);
    const southwest = computeDestinationPoint(location, radius, 225);

    const matchingSpawnAres = await this.findSpawnAreasForRegion({
      northeast: { lat: northeast.latitude, lng: northeast.longitude },
      southwest: { lat: southwest.latitude, lng: southwest.longitude },
    });

    return matchingSpawnAres
      .sort((s1, s2) => this.compareByDistance(s1, s2, location))
      .slice(0, this.configService.get(
        ConfigKeyEnum.SPAWN_AREAS_MAX_AREAS,
      ) as number);
  }

  async getSpawnAreaWithMonsters(id: string): Promise<SpawnAreaEntity | null> {
    return this.spawnAreaRepository.findOne(id, {
      relations: ['monsterInstances'],
    });
  }

  async setMonsters(
    spawnArea: SpawnAreaEntity,
    monsterEntities: MonsterInstanceEntity[],
  ): Promise<SpawnAreaEntity> {
    spawnArea.monsterInstances = monsterEntities;
    return this.spawnAreaRepository.save(spawnArea);
  }

  private async findSpawnAreasForRegion(
    region: Rect,
  ): Promise<SpawnAreaEntity[]> {
    this.logger.debug('findSpawnAreasForRegion: ' + JSON.stringify(region));
    const mapFragments: MapFragmentEntity[] = await this.mapFragmentEntityRepository
      .query(getMapFragmentsForRegionQuery, [toPolygon(region)])
      .then((ids: string[]) => this.mapFragmentEntityRepository.findByIds(ids));

    if (!mapFragments.length) {
      this.logger.log('Could not find map fragment in DB, calling google maps');
      return this.fetchFragment(region);
    } else {
      this.logger.log('Found map fragment for region');
      const fragmentIds = mapFragments.map(f => f.id);
      return this.spawnAreaRepository.find({
        where: { mapFragmentId: fragmentIds },
      });
    }
  }

  private async fetchFragment(region: Rect): Promise<SpawnAreaEntity[]> {
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

    const spawnAreas = await this.createSpawnAreas(places, mapFragment);
    await this.spawnAreaRepository
      .createQueryBuilder()
      .insert()
      .values(spawnAreas)
      .onConflict('("placeId") do nothing')
      .execute();

    return spawnAreas;
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

  private createSpawnAreas(
    places: IPlace[],
    mapFragment: MapFragmentEntity,
  ): Promise<SpawnAreaEntity[]> {
    return Promise.all(
      places.map(place =>
        this.spawnAreaRepository.create(toSpawnAreaEntity(place, mapFragment)),
      ),
    );
  }

  private compareByDistance(
    s1: SpawnAreaEntity,
    s2: SpawnAreaEntity,
    location: LatLng,
  ): number {
    const s1Rect = toRect(s1.coords);
    const s2Rect = toRect(s2.coords);

    const s1Center = getCenter([s1Rect.southwest, s1Rect.northeast]);
    const s2Center = getCenter([s2Rect.southwest, s2Rect.northeast]);

    if (!s1Center || !s2Center) {
      this.logger.warn(
        `Cannot compute center of spawn areas with id: ${s1.id} ${s2.id}`,
      );
      return 0;
    }

    const s1Distance = getDistance(s1Center, location);
    const s2Distance = getDistance(s2Center, location);

    return s1Distance - s2Distance;
  }
}
