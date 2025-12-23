import 'reflect-metadata';
import { addAlias } from 'module-alias';
import * as dotenv from 'dotenv';

addAlias('@', 'dist');

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, RequestMethod } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { extractor } from '@/common/utils';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  app.enableVersioning({
    type: VersioningType.CUSTOM,
    extractor,
    defaultVersion: process.env.DEFAULT_VERSION ?? '1',
  });
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
void bootstrap();
