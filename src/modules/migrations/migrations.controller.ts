import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { MigrationsService } from './migrations.service';
import { FastifyReply } from 'fastify';

@Controller('migrations')
export class MigrationsController {
  constructor(private readonly migrationsService: MigrationsService) { }

  @Get()
  async migrations(): Promise<Array<any>> {
    return this.migrationsService.migrations('GET');
  }

  @Post()
  async runMigrations(@Res({ passthrough: true }) reply: FastifyReply): Promise<Array<any>> {
    const result = await this.migrationsService.migrations('POST');

    reply.code(result.length === 0 ? HttpStatus.OK : HttpStatus.CREATED);
    return result;
  }
}
