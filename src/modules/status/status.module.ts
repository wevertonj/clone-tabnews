import { StatusController, StatusService } from '@/modules/status';
import { Module } from '@nestjs/common';

@Module({
  providers: [StatusService],
  controllers: [StatusController]
})
export class StatusModule { }
