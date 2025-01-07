import { Injectable } from '@nestjs/common';
import { Database } from '@/shared/infra/database';
import { Status, StatusJson, StatusType } from '@/modules/status';
import { isRight } from 'fp-ts/lib/Either';

@Injectable()
export class StatusService {
  async getStatus(): Promise<StatusJson> {
    const database = new Database();
    const versionResult = await database.getVersion();
    const maxConnectionsResult = await database.getMaxConnections();
    const activeConnectionsResult = await database.getActiveConnections();

    let statusType: StatusType = StatusType.ERROR;
    let version: string = '';
    let maxConnections: number = 0;
    let activeConnections: number = 0;

    if (isRight(versionResult)) {
      version = versionResult.right;
      statusType = StatusType.OK;
    }

    if (isRight(maxConnectionsResult)) {
      maxConnections = maxConnectionsResult.right;
    }

    if (isRight(activeConnectionsResult)) {
      activeConnections = activeConnectionsResult.right;
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
