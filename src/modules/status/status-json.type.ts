import { StatusType } from '@/modules/status/status-type.enum';

export type StatusJson = {
  updated_at: string;
  dependencies: {
    database: {
      status: StatusType;
      version: string;
      max_connections: number;
      opened_connections: number;
    };
  };
};
