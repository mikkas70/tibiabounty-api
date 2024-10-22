import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TibiaService } from './tibia.service';
import { TibiaController } from './tibia.controller';
import { TibiaSchedule } from './tibia.schedule';
import { TibiaEvent } from './tibia.event';

@Module({
  imports: [HttpModule],
  controllers: [TibiaController],
  providers: [TibiaService, TibiaSchedule, TibiaEvent],
  exports: [TibiaService],
})
export class TibiaModule {}
