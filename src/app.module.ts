import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { StatusModule } from '@/modules/status/status.module';
import { MigrationsModule } from './modules/migrations/migrations.module';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  imports: [StatusModule, MigrationsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
