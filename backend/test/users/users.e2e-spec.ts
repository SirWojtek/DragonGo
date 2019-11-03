import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { deepEqual, instance, mock, when } from 'ts-mockito';
import { Repository } from 'typeorm';
import { RegisterRequest } from '../../..//api/user.api';
import { UserEntity } from '../../src/models/db/user.entity';
import { UsersModule } from '../../src/users/users.module';
import { generateUser } from '../utils/generators';

describe('UsersController (e2e)', () => {
  let app;

  let user: UserEntity;
  let plainPassword: string;
  let userRepositoryMock: Repository<UserEntity>;

  beforeEach(async () => {
    plainPassword = 'test_pass';
    user = await generateUser(plainPassword);

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

  it('returns 401 on for not existing username', done => {
    const loginRequest = {
      username: 'not_existing',
      password: 'test',
    };
    request(app.getHttpServer())
      .post('/users/login')
      .send(loginRequest)
      .set('Accept', 'application/json')
      .expect(401)
      .end(() => done());
  });

  it('returns 401 on for not wrong password', done => {
    const loginRequest = {
      username: user.username,
      password: 'wrong-password',
    };
    request(app.getHttpServer())
      .post('/users/login')
      .send(loginRequest)
      .set('Accept', 'application/json')
      .expect(401)
      .end(() => done());
  });

  it('registers not existing user', done => {
    const registerRequest: RegisterRequest = {
      username: 'not-existing-user',
      password: 'test',
    };

    request(app.getHttpServer())
      .post('/users/register')
      .send(registerRequest)
      .set('Accept', 'application/json')
      .expect(201)
      .expect(res => expect(res.body).toBeTruthy())
      .end(() => done());
  });

  it('logins registered user', done => {
    const loginRequest = {
      username: user.username,
      password: plainPassword,
    };
    request(app.getHttpServer())
      .post('/users/login')
      .send(loginRequest)
      .set('Accept', 'application/json')
      .expect(201)
      .expect(res => expect(res.body).toBeTruthy())
      .end(() => done());
  });
});
