import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  getStatus() {
    return { message: 'É nois que voa bruxão!' };
  }
}