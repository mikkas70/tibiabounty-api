import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BountyContract, BountyContractSchema } from './bountyContract.schema';
import { BountyContractService } from './bountyContract.service';
import { BountyContractController } from './bountyContract.controller';
import { BountyContractSchedule } from './bountyContract.schedule';
import { BountyContractEvent } from './bountyContract.event';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BountyContract.name, schema: BountyContractSchema },
    ]),
  ],
  controllers: [BountyContractController],
  providers: [
    BountyContractService,
    BountyContractSchedule,
    BountyContractEvent,
  ],
  exports: [BountyContractService],
})
export class BountyContractModule {}
