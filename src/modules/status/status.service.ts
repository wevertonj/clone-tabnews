import { Injectable } from '@nestjs/common';
import { Database } from '@/shared/infra/database';

@Injectable()
export class StatusService {
  async getStatus() {
    const database = new Database();
    const result = await database.query({ query: 'SELECT 1 + 1;' });
    console.log(result.rows);

    return { message: 'É nois que voa bruxão!' };
  }
}
