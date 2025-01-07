import { StatusType } from '@/modules/status/status-type.enum';

export type StatusJson = {
  updated_at: string;
  dependencies: {
    postgres: {
      status: StatusType;
      version: string;
      maxConnections: number;
      activeConnections: number;
    };
  };
};
