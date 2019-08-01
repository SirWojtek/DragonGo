import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { mock, instance, when } from 'ts-mockito';
import { UsersModule } from '../../src/users/users.module';
import { RegisterRequest } from '../../src/models/api/user.api';
import uuid = require('uuid');
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/models/db/user.entity';

describe('UsersController (e2e)', () => {
  let app;

  let user: UserEntity;
  let userRepositoryMock: Repository<UserEntity>;

  beforeAll(async () => {
    user = {
      id: 'test-id',
      username: 'test-user',
      password: 'test_pass',
      createdAt: new Date(),
      updatedAt: new Date(),
      hashPassword: null,
    };
    userRepositoryMock = mock(Repository);

    when(
      userRepositoryMock.findOne({ where: { username: user.username } }),
    ).thenReturn(Promise.resolve(user));

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider('UserEntityRepository')
      .useValue(Object.assign({}, instance(userRepositoryMock)))
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
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
      password: user.password,
    };
    const loginResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send(loginRequest)
      .set('Accept', 'application/json')
      .expect(200);
    expect(loginResponse).toBeTruthy();
  });
});
