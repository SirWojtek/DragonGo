import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { anyString, anything, instance, mock, when } from 'ts-mockito';
import { Repository } from 'typeorm';
import { GetSpawnAreas } from '../../../api/spawn-areas.api';
import { MapFragmentEntity } from '../../src/models/db/map-fragment.entity';
import { SpawnAreaEntity } from '../../src/models/db/spawn-area.entity';
import {
  GoogleMapsService,
  IPlace,
} from '../../src/services/google-maps.service';
import { ServicesModule } from '../../src/services/services.module';
import { SpawnAreasModule } from '../../src/spawn-areas/spawn-areas.module';
import { toRect } from '../../src/utils/geojson';
import { NoopStrategy } from '../auth/noop-strategy';
import { generateMapFragment, generateSpawnArea } from '../utils/generators';

describe('SpawnAreasController (e2e)', () => {
  let app: INestApplication;

  let spawnAreaRepositoryMock: Repository<SpawnAreaEntity>;
  let mapFragmentRepositoryMock: Repository<MapFragmentEntity>;
  let googleMapsServiceMock: GoogleMapsService;

  let req: GetSpawnAreas;
  let spawnArea: SpawnAreaEntity;
  let mapFragment: MapFragmentEntity;

  beforeEach(() => {
    req = {
      location: {
        lat: 60,
        lng: 60,
      },
    };
    spawnArea = generateSpawnArea({
      northeast: {
        lat: 55,
        lng: 55,
      },
      southwest: {
        lat: 53,
        lng: 53,
      },
    });

    mapFragment = generateMapFragment({
      northeast: {
        lat: 70,
        lng: 70,
      },
      southwest: {
        lat: 50,
        lng: 50,
      },
    });
  });

  beforeEach(async () => {
    spawnAreaRepositoryMock = mock(Repository);
    mapFragmentRepositoryMock = mock(Repository);
    googleMapsServiceMock = mock(GoogleMapsService);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SpawnAreasModule, ServicesModule],
      providers: [NoopStrategy],
    })
      .overrideProvider('SpawnAreaEntityRepository')
      .useValue(Object.assign({}, instance(spawnAreaRepositoryMock)))
      .overrideProvider('MapFragmentEntityRepository')
      .useValue(Object.assign({}, instance(mapFragmentRepositoryMock)))
      .overrideProvider(GoogleMapsService)
      .useValue(instance(googleMapsServiceMock))
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('returns spawn areas for existing map fragment', async () => {
    when(mapFragmentRepositoryMock.query(anyString(), anything())).thenResolve([
      mapFragment.id,
    ]);
    when(mapFragmentRepositoryMock.findByIds(anything())).thenResolve([
      mapFragment,
    ]);
    when(spawnAreaRepositoryMock.find(anything())).thenResolve([spawnArea]);

    const response = await request(app.getHttpServer())
      .post('/spawn-areas/get-spawn-areas')
      .send(req)
      .set('Accept', 'application/json')
      .expect(201);

    expect(response.body).toEqual([
      {
        id: spawnArea.id,
        name: spawnArea.name,
        rect: toRect(spawnArea.coords),
      },
    ]);
  });

  it('returns spawn areas for not existing map fragments', async () => {
    const place: IPlace = {
      name: 'Test Place',
      viewport: {
        northeast: {
          lat: 55,
          lng: 55,
        },
        southwest: {
          lat: 53,
          lng: 53,
        },
      },
    };

    when(googleMapsServiceMock.getPlaces(anything(), anything())).thenResolve([
      place,
    ]);

    when(mapFragmentRepositoryMock.query(anyString(), anything())).thenResolve(
      [],
    );
    when(mapFragmentRepositoryMock.findByIds(anything())).thenResolve([]);
    when(mapFragmentRepositoryMock.save(anything())).thenCall(res => res);
    when(mapFragmentRepositoryMock.create(anything())).thenCall(res => res);

    when(spawnAreaRepositoryMock.create(anything())).thenCall(res => res);
    when(spawnAreaRepositoryMock.save(anything())).thenCall(res => res);

    const response = await request(app.getHttpServer())
      .post('/spawn-areas/get-spawn-areas')
      .send(req)
      .set('Accept', 'application/json')
      .expect(201);

    expect(response.body).toEqual([
      {
        name: place.name,
        rect: place.viewport,
      },
    ]);
  });
});
