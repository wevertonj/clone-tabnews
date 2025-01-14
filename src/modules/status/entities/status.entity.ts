import { StatusJson } from '@/modules/status/status-json.type';
import { StatusType } from '@/modules/status/status-type.enum';

export class Status {
  updatedAt: string;

  private postgresStatus: StatusType;
  private postgresVersion: string;
  private postgresMaxConnections: number;
  private postgresActiveConnections: number;

  constructor({ updatedAt }: { updatedAt: string; }) {
    this.updatedAt = updatedAt;
    this.postgresStatus = StatusType.ERROR;
    this.postgresVersion = '';
    this.postgresMaxConnections = 0;
    this.postgresActiveConnections = 0;
  }

  setPostgres({
    status,
    version,
    maxConnections,
    activeConnections
  }: {
    status: StatusType;
    version: string;
    maxConnections: number;
    activeConnections: number;
  }) {
    this.postgresStatus = status;
    this.postgresVersion = version;
    this.postgresMaxConnections = maxConnections;
    this.postgresActiveConnections = activeConnections;
  }

  toJSON(): StatusJson {
    return {
      updated_at: this.updatedAt,
      dependencies: {
        database: {
          status: this.postgresStatus,
          version: this.postgresVersion,
          max_connections: this.postgresMaxConnections,
          opened_connections: this.postgresActiveConnections,
        }
      }
    };
  }
}
