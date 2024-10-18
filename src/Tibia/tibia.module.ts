import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TibiaService } from './tibia.service';
import { TibiaController } from './tibia.controller';

@Module({
  imports: [HttpModule],
  controllers: [TibiaController],
  providers: [TibiaService],
  exports: [TibiaService],
})
export class TibiaModule {}
