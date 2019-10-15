import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { deepEqual, instance, mock, when } from 'ts-mockito';
import { Repository } from 'typeorm';
import uuid = require('uuid');
import { RegisterRequest } from '../../src/models/api/user.api';
import { UserEntity } from '../../src/models/db/user.entity';
import { UsersModule } from '../../src/users/users.module';
import { hash } from '../../src/utils/bcrypt';

describe('UsersController (e2e)', () => {
  let app;

  let user: UserEntity;
  let plainPassword: string;
  let userRepositoryMock: Repository<UserEntity>;

  beforeEach(async () => {
    plainPassword = 'test_pass';
    user = {
      id: 'test-id',
      username: 'test-user',
      password: await hash(plainPassword),
      createdAt: new Date(),
      updatedAt: new Date(),
      hashPassword: null,
      level: 1,
    };
    userRepositoryMock = mock(Repository);

    when(
      userRepositoryMock.findOne(
        deepEqual({ where: { username: user.username } }),
      ),
    ).thenResolve(user);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider('UserEntityRepository')
      .useValue(Object.assign({}, instance(userRepositoryMock)))
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('returns 401 on for not existing username', async () => {
    const loginRequest = {
      username: 'not_existing',
      password: 'test',
    };
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send(loginRequest)
      .set('Accept', 'application/json')
      .expect(401);
  });

  it('returns 401 on for not wrong password', async () => {
    const loginRequest = {
      username: user.username,
      password: 'wrong-password',
    };
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send(loginRequest)
      .set('Accept', 'application/json')
      .expect(401);
  });

  it('registers not existing user', async () => {
    const registerRequest: RegisterRequest = {
      username: 'not-existing-user',
      password: 'test',
    };

    const registerResponse = await request(app.getHttpServer())
      .post('/users/register')
      .send(registerRequest)
      .set('Accept', 'application/json')
      .expect(201);
    expect(registerResponse.body).toBeTruthy();
  });

  it('logins registered user', async () => {
    const loginRequest = {
      username: user.username,
      password: plainPassword,
    };
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send(loginRequest)
      .set('Accept', 'application/json')
      .expect(201);
    expect(loginResponse).toBeTruthy();
  });
});
