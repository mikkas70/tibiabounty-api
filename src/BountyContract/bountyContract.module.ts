import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BountyContract, BountyContractSchema } from './bountyContract.schema';
import { BountyContractService } from './bountyContract.service';
import { BountyContractController } from './bountyContract.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BountyContract.name, schema: BountyContractSchema },
    ]),
  ],
  controllers: [BountyContractController],
  providers: [BountyContractService],
  exports: [BountyContractService],
})
export class BountyContractModule {}
