import { StatusService } from '@/v1/status/status.service';
import { Controller, Get } from '@nestjs/common';

@Controller('status')
export class StatusController {
  constructor(
    private readonly statusService: StatusService
  ) { }

  @Get()
  getStatus() {
    return this.statusService.getStatus();
  }
}
