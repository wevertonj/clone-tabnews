import { Pool, QueryResult } from 'pg';
import * as dotenv from 'dotenv';
import { Either, left, right } from 'fp-ts/lib/Either';
import { DatabaseNotFoundError } from '@/shared/infra/database';

interface VersionResult {
  version: string;
}

interface MaxConnectionsResult {
  max_connections: string;
}

interface ActiveConnectionsResult {
  count: string;
}

export class Database {
  private pool: Pool;

  constructor() {
    dotenv.config();

    this.pool = new Pool({
      host: process.env.DATABASE_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
    });
  }

  async query({ query }: { query: string; }): Promise<QueryResult<any>> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query);
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
    const query = 'SELECT COUNT(*) FROM pg_stat_activity WHERE datname = current_database()';
    const result = await this.query({ query });

    const row = result.rows[0] as ActiveConnectionsResult;

    if (result.rowCount === 0 || !row.count) {
      return left(new DatabaseNotFoundError('Active connections not found'));
    }

    const activeConnections = parseInt(row.count);

    return right(activeConnections);
  }
}
