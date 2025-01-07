import { StatusJson } from '@/modules/status';
import { StatusService } from '@/modules/status/status.service';
import { Controller, Get } from '@nestjs/common';

@Controller({
  version: '1',
})
export class StatusController {
  constructor(
    private readonly statusService: StatusService
  ) { }

  @Get('status')
  getStatus(): Promise<StatusJson> {
    return this.statusService.getStatus();
  }
}
