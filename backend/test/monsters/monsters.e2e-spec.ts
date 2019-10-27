import { Test, TestingModule } from '@nestjs/testing';
import * as io from 'socket.io-client';
import { anything, instance, mock, when } from 'ts-mockito';
import { Repository } from 'typeorm';
import { MapFragmentEntity } from '../../src/models/db/map-fragment.entity';
import { MonsterInstanceEntity } from '../../src/models/db/monster-instance.entity';
import { MonsterMetadataEntity } from '../../src/models/db/monster-metadata.entity';
import { SpawnAreaEntity } from '../../src/models/db/spawn-area.entity';
import { UserEntity } from '../../src/models/db/user.entity';
import { MonstersModule } from '../../src/monsters/monsters.module';

describe('MonstersGateway (e2e)', () => {
  let app;

  let socketClient: SocketIOClient.Socket;

  let user: Partial<UserEntity>;

  let monsterInstanceRepositoryMock: Repository<MonsterInstanceEntity>;
  let monsterMetadataRepositoryMock: Repository<MonsterMetadataEntity>;
  let userEntityRepositoryMock: Repository<UserEntity>;
  let spawnAreaEntityRepositoryMock: Repository<SpawnAreaEntity>;
  let mapFragmentEntityRepositoryMock: Repository<MapFragmentEntity>;

  beforeEach(async () => {
    user = {
      id: 'test-id',
      username: 'test-name',
      level: 1,
    };

    monsterInstanceRepositoryMock = mock(Repository);
    monsterMetadataRepositoryMock = mock(Repository);
    userEntityRepositoryMock = mock(Repository);
    spawnAreaEntityRepositoryMock = mock(Repository);
    mapFragmentEntityRepositoryMock = mock(Repository);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MonstersModule],
    })
      .overrideProvider('MonsterInstanceEntityRepository')
      .useValue(instance(monsterInstanceRepositoryMock))
      .overrideProvider('MonsterMetadataEntityRepository')
      .useValue(instance(monsterMetadataRepositoryMock))
      .overrideProvider('UserEntityRepository')
      .useValue(instance(userEntityRepositoryMock))
      .overrideProvider('SpawnAreaEntityRepository')
      .useValue(instance(spawnAreaEntityRepositoryMock))
      .overrideProvider('MapFragmentEntityRepository')
      .useValue(instance(mapFragmentEntityRepositoryMock))
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const address = app
      .getHttpServer()
      .listen()
      .address();
    const baseAddress = `http://[${address.address}]:${address.port}`;
    socketClient = io.connect(`${baseAddress}/monsters`, {
      extraHeaders: {
        Authorization: JSON.stringify(user),
      },
    } as SocketIOClient.ConnectOpts);
  });

  afterAll(async () => {
    await app.close();
  });

  it('throws if there is no spawn area with given id', done => {
    const spawnAreaId = 'test';
    when(spawnAreaEntityRepositoryMock.findOne(spawnAreaId)).thenResolve(null);

    socketClient.on('connect', () => {
      const request = { spawnAreaId };
      socketClient.emit('spawn-area-monsters', request);
    });
    socketClient.on('exception', error => {
      expect(error.message).toContain('find spawn area');
      done();
    });
  });

  it('returns spawn area', done => {
    const spawnAreaId = 'test';
    const monsterInstance: MonsterInstanceEntity = {
      id: 'test-monster',
      level: 1,
      monsterMetadataId: null,
      monsterMetadata: {
        id: null,
        name: 'Test Monster',
        description: 'This is test monster',
        minLevel: 1,
        maxLevel: 2,
        monsterInstances: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      latLng: null,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    const spawnArea: SpawnAreaEntity = {
      id: spawnAreaId,
      name: 'Test Spawn Area',
      coords: null,
      monsterInstances: [monsterInstance],
      mapFragment: null,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    when(spawnAreaEntityRepositoryMock.findOne(spawnAreaId)).thenResolve(
      spawnArea,
    );
    when(spawnAreaEntityRepositoryMock.save(anything())).thenCall(args => args);

    socketClient.on('connect', () => {
      const request = { spawnAreaId };
      socketClient.emit('spawn-area-monsters', request);

      socketClient.on('spawn-area-monsters', response => {
        expect(response).toEqual([
          {
            id: monsterInstance.id,
            name: monsterInstance.monsterMetadata.name,
            description: monsterInstance.monsterMetadata.description,
            level: monsterInstance.level,
          },
        ]);
        done();
      });
    });

    socketClient.on('exception', error => {
      done.fail(error);
    });
  });
});
