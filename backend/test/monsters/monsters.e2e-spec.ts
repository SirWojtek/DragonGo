import { Test, TestingModule } from '@nestjs/testing';
import * as io from 'socket.io-client';
import { anything, instance, mock, when } from 'ts-mockito';
import { Repository } from 'typeorm';
import { Monster } from '../../../api/monsters.api';
import { MapFragmentEntity } from '../../src/models/db/map-fragment.entity';
import { MonsterInstanceEntity } from '../../src/models/db/monster-instance.entity';
import { MonsterMetadataEntity } from '../../src/models/db/monster-metadata.entity';
import { SpawnAreaEntity } from '../../src/models/db/spawn-area.entity';
import { UserEntity } from '../../src/models/db/user.entity';
import { MonstersModule } from '../../src/monsters/monsters.module';
import {
  generateMonsterInstance,
  generateSpawnArea,
  generateUser,
} from '../utils/generators';

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
    user = await generateUser();

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
    const baseAddress = `http://localhost:${address.port}`;
    console.log(baseAddress);
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

  it('returns spawn area monsters without generation', done => {
    const monsterInstances = [
      generateMonsterInstance(),
      generateMonsterInstance(),
    ];
    const spawnArea = generateSpawnArea();
    spawnArea.monsterInstances = monsterInstances;

    when(
      spawnAreaEntityRepositoryMock.findOne(spawnArea.id, anything()),
    ).thenResolve(spawnArea);
    when(spawnAreaEntityRepositoryMock.save(anything())).thenCall(args => args);

    socketClient.on('connect', () => {
      const request = { spawnAreaId: spawnArea.id };
      socketClient.emit('spawn-area-monsters', request);

      socketClient.on('spawn-area-monsters', (response: Monster[]) => {
        expect(response.length).toEqual(2);
        const ids = response.map(m => m.id);
        expect(ids).toContain(monsterInstances[0].id);
        expect(ids).toContain(monsterInstances[1].id);
        done();
      });
    });

    socketClient.on('exception', error => {
      done.fail(error);
    });
  });
});
