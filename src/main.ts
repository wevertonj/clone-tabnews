import 'reflect-metadata';
import { addAlias } from 'module-alias';
import { resolve } from 'path';

const isDev = process.env.APP_ENV === 'development';
addAlias('@', resolve(isDev ? 'src' : 'dist'));

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { extractor } from '@/shared/utils';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.CUSTOM,
    extractor,
    defaultVersion: process.env.DEFAULT_VERSION ?? '1',
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
