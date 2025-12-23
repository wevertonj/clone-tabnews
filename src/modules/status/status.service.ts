import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/common/database/database.service';
import { Status } from './entities/status.entity';
import { StatusResponseDto } from './dto/status-response.dto';
import { StatusType } from './enums/status-type.enum';
import { isRight } from 'fp-ts/lib/Either';

@Injectable()
export class StatusService {
  constructor(private readonly databaseService: DatabaseService) { }

  async getStatus(): Promise<StatusResponseDto> {
    const databaseVersionResult = await this.databaseService.getVersion();
    const databaseMaxConnectionsResult = await this.databaseService.getMaxConnections();
    const databaseActiveConnectionsResult = await this.databaseService.getActiveConnections();

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
