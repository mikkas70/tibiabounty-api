import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bounty, BountySchema } from './bounty.schema';
import { BountyService } from './bounty.service';
import { BountyController } from './bounty.controller';
import { BountySchedule } from './bounty.schedule';
import { BountyEvent } from './bounty.event';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bounty.name, schema: BountySchema }]),
  ],
  controllers: [BountyController],
  providers: [BountyService, BountySchedule, BountyEvent],
  exports: [BountyService],
})
export class BountyModule {}
