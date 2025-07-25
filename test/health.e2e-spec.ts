import { App } from 'supertest/types';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthModule } from '../src/modules/health/presentation/health.module';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HealthModule, AppModule],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return all services up', async () => {
    // Act and Assert
    const response = await request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.OK);

    expect(response).not.toContain('down');
  });
});
