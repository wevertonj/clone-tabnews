import { Injectable } from '@nestjs/common';
import { Database } from '@/shared/infra/database';
import { Status, StatusJson, StatusType } from '@/modules/status';
import { isRight } from 'fp-ts/lib/Either';

@Injectable()
export class StatusService {
  async getStatus(): Promise<StatusJson> {
    const database = new Database();
    const databaseVersionResult = await database.getVersion();
    const databaseMaxConnectionsResult = await database.getMaxConnections();
    const databaseActiveConnectionsResult = await database.getActiveConnections();

    let statusType: StatusType = StatusType.ERROR;
    let version: string = '';
    let maxConnections: number = 0;
    let activeConnections: number = 0;

    if (isRight(databaseVersionResult)) {
      version = databaseVersionResult.right;
      statusType = StatusType.OK;
    }

    if (isRight(databaseMaxConnectionsResult)) {
      maxConnections = databaseMaxConnectionsResult.right;
    }

    if (isRight(databaseActiveConnectionsResult)) {
      activeConnections = databaseActiveConnectionsResult.right;
    }

    const updatedAt = new Date().toISOString();
    const status = new Status({ updatedAt });

    status.setPostgres({
      status: statusType,
      version,
      maxConnections,
      activeConnections
    });

    return status.toJSON();
  }
}
