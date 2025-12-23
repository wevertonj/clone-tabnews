import { StatusType } from '../enums/status-type.enum';

export class StatusResponseDto {
  updated_at!: string;
  dependencies!: {
    database: {
      status: StatusType;
      version: string;
      max_connections: number;
      opened_connections: number;
    };
  };
}
