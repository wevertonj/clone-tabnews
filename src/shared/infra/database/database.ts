import { Client, QueryResult } from 'pg';
import * as dotenv from 'dotenv';

export class Database {
  private client: Client;

  constructor() {
    dotenv.config();

    this.client = new Client(
      {
        host: process.env.DATABASE_HOST,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        port: Number(process.env.POSTGRES_PORT),
      }
    );
  }

  async query({ query }: { query: string; }): Promise<QueryResult<any>> {
    await this.client.connect();
    const result = await this.client.query(query);
    await this.client.end();

    return result;
  }
}
