import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BountyContract, BountyContractSchema } from './bountyContract.schema';
import { BountyContractService } from './bountyContract.service';
import { BountyContractController } from './bountyContract.controller';
import { BountyContractSchedule } from './bountyContract.schedule';
import { BountyModule } from '../Bounty/bounty.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BountyContract.name, schema: BountyContractSchema },
    ]),
    BountyModule,
  ],
  controllers: [BountyContractController],
  providers: [BountyContractService, BountyContractSchedule],
  exports: [BountyContractService],
})
export class BountyContractModule {}
