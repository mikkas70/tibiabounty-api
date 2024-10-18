import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TibiaApiService } from './tibiaApi.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [TibiaApiService],
  exports: [TibiaApiService],
})
export class TibiaApiModule {}
