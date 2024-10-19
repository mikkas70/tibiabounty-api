import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BountyCollector,
  BountyCollectorSchema,
} from './bountyCollector.schema';
import { BountyCollectorService } from './bountyCollector.service';
import { BountyCollectorController } from './bountyCollector.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BountyCollector.name,
        schema: BountyCollectorSchema,
      },
    ]),
  ],
  controllers: [BountyCollectorController],
  providers: [BountyCollectorService],
  exports: [BountyCollectorService],
})
export class BountyCollectorModule {}
