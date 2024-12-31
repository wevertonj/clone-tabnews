import 'reflect-metadata';
import { addAlias } from 'module-alias';
import * as dotenv from 'dotenv';

addAlias('@', 'dist');

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { extractor } from '@/shared/utils';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.CUSTOM,
    extractor,
    defaultVersion: process.env.DEFAULT_VERSION ?? '1',
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
