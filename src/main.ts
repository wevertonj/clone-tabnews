import 'reflect-metadata';
import { addAlias } from 'module-alias';
import { resolve } from 'path';

const isDev = process.env.NODE_ENV === 'DEV';
addAlias('@', resolve(isDev ? 'src' : 'dist'));

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
