import { Injectable } from '@nestjs/common';
import migrationRunner from 'node-pg-migrate';

@Injectable()
export class MigrationsService {
  async migrations(method: string): Promise<Array<any>> {
    const dryRun = method === 'GET';

    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL as string,
      dryRun: dryRun,
      dir: 'src/common/database/migrations',
      direction: 'up',
      migrationsTable: 'pgmigrations',
      verbose: true,
    });

    return migrations;

  }
}
