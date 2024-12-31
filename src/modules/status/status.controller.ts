import { StatusService } from '@/modules/status/status.service';
import { Controller, Get, Version } from '@nestjs/common';

@Controller({
  version: '1',
})
export class StatusController {
  constructor(
    private readonly statusService: StatusService
  ) { }

  @Get('status')
  getStatus() {
    return this.statusService.getStatus();
  }

  @Version('2')
  @Get('status')
  getStatusV2() {
    return this.statusService.getStatusV2();
  }
}
