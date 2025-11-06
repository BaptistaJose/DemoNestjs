import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(GET) /users/ retornar un arreglo de usuarios con un status 200', async () => {
    const req = await request(app.getHttpServer()).get('/users')
    console.log(req.body);
    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Array)
  });
});
