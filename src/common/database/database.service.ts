import { Pool, QueryResult } from 'pg';
import * as dotenv from 'dotenv';
import { Either, left, right } from 'fp-ts/lib/Either';
import { DatabaseNotFoundError } from './database-errors';
import { Injectable, OnModuleDestroy } from '@nestjs/common';

interface VersionResult {
  version: string;
}

interface MaxConnectionsResult {
  max_connections: string;
}

interface ActiveConnectionsResult {
  count: string;
}

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private pool: Pool;
  private databaseName: string;

  constructor() {
    dotenv.config();

    this.databaseName = process.env.POSTGRES_DB ?? '';

    this.pool = new Pool({
      host: process.env.DATABASE_HOST,
      database: this.databaseName,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
    });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query({ query, values }: { query: string; values?: any[]; }): Promise<QueryResult<any>> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return result;
    } finally {
      client.release();
    }
  }

  async getVersion(): Promise<Either<DatabaseNotFoundError, string>> {
    const query = 'SELECT version()';
    const result = await this.query({ query });

    const row = result.rows[0] as VersionResult;

    if (result.rowCount === 0 || !row.version) {
      return left(new DatabaseNotFoundError('Version not found'));
    }

    const versionMatch = row.version.match(/PostgreSQL (\d+\.\d+)/);

    if (!versionMatch) {
      return left(new DatabaseNotFoundError('Version not found'));
    }

    return right(versionMatch[1]);
  }

  async getMaxConnections(): Promise<Either<DatabaseNotFoundError, number>> {
    const query = 'SHOW max_connections';
    const result = await this.query({ query });

    const row = result.rows[0] as MaxConnectionsResult;

    if (result.rowCount === 0 || !row.max_connections) {
      return left(new DatabaseNotFoundError('Max connections not found'));
    }

    const maxConnections = parseInt(row.max_connections);

    return right(maxConnections);
  }

  async getActiveConnections(): Promise<Either<DatabaseNotFoundError, number>> {
    const databaseName = this.databaseName;
    const query = 'SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;';
    const result = await this.query({ query, values: [databaseName] });

    const row = result.rows[0] as ActiveConnectionsResult;

    if (result.rowCount === 0 || !row.count) {
      return left(new DatabaseNotFoundError('Active connections not found'));
    }

    const activeConnections = parseInt(row.count);

    return right(activeConnections);
  }
}
