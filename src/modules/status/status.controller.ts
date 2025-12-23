import { StatusResponseDto } from './dto/status-response.dto';
import { StatusService } from './status.service';
import { Controller, Get } from '@nestjs/common';

@Controller({
  version: '1',
})
export class StatusController {
  constructor(
    private readonly statusService: StatusService
  ) { }

  @Get('status')
  getStatus(): Promise<StatusResponseDto> {
    return this.statusService.getStatus();
  }
}
