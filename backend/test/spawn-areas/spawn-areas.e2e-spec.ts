import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { SpawnAreasModule } from '../../src/spawn-areas/spawn-areas.module';
import { GetSpawnAreas } from '../../src/models/api/spawn-areas.api';
import { Repository } from 'typeorm';
import { SpawnAreaEntity } from '../../src/models/db/spawn-area.entity';
import { mock, instance, when, anything, anyString } from 'ts-mockito';
import { MapFragmentEntity } from '../../src/models/db/map-fragment.entity';
import { ConfigService } from '../../src/services/config.service';
import { ServicesModule } from '../../src/services/services.module';
import { toPolygon, toPoint, toRect } from '../../src/utils/geojson';
import { NoopStrategy } from '../auth/noop-strategy';

describe('SpawnAreasController (e2e)', () => {
  let app;

  let spawnAreaRepositoryMock: Repository<SpawnAreaEntity>;
  let mapFragmentRepositoryMock: Repository<MapFragmentEntity>;

  beforeAll(async () => {
    spawnAreaRepositoryMock = mock(Repository);
    mapFragmentRepositoryMock = mock(Repository);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SpawnAreasModule, ServicesModule],
      providers: [NoopStrategy],
    })
      .overrideProvider('SpawnAreaEntityRepository')
      .useValue(Object.assign({}, instance(spawnAreaRepositoryMock)))
      .overrideProvider('MapFragmentEntityRepository')
      .useValue(Object.assign({}, instance(mapFragmentRepositoryMock)))
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns spawn areas for location', async () => {
    const req: GetSpawnAreas = {
      location: {
        lat: 60,
        lng: 60,
      },
    };
    const spawnArea: SpawnAreaEntity = {
      id: 'test-spawn-area',
      name: 'Test Spawn Area',
      coords: toPolygon({
        northeast: {
          lat: 55,
          lng: 55,
        },
        southwest: {
          lat: 53,
          lng: 53,
        },
      }),
      monsterInstances: [],
      mapFragment: null,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    const mapFragment: MapFragmentEntity = {
      id: 'test-map-fragment',
      coords: toPolygon({
        northeast: {
          lat: 70,
          lng: 70,
        },
        southwest: {
          lat: 50,
          lng: 50,
        },
      }),
      spawnAreas: null,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

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
});
