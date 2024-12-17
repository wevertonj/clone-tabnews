import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { Express } from 'express';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /* eslint-disable @typescript-eslint/no-misused-promises */
  it('/ (GET)', async () => {
    const httpServer = app.getHttpServer() as Express;

    await request(httpServer).get('/').expect(200).expect('Hello World!');
  });
  /* eslint-enable @typescript-eslint/no-misused-promises */
});
