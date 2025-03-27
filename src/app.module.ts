import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { StatusModule } from '@/modules/status/status.module';
import { MigrationsModule } from './modules/migrations/migrations.module';

@Module({
  imports: [StatusModule, MigrationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
