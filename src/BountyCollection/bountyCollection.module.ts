import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BountyCollection,
  BountyCollectionSchema,
} from './bountyCollection.schema';
import { BountyCollectionService } from './bountyCollection.service';
import { BountyCollectionController } from './bountyCollection.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BountyCollection.name, schema: BountyCollectionSchema },
    ]),
  ],
  controllers: [BountyCollectionController],
  providers: [BountyCollectionService],
  exports: [BountyCollectionService],
})
export class BountyCollectionModule {}
