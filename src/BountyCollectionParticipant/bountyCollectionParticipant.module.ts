import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BountyCollectionParticipant,
  BountyCollectionParticipantSchema,
} from './bountyCollectionParticipant.schema';
import { BountyCollectionParticipantService } from './bountyCollectionParticipant.service';
import { BountyCollectionParticipantController } from './bountyCollectionParticipant.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BountyCollectionParticipant.name,
        schema: BountyCollectionParticipantSchema,
      },
    ]),
  ],
  controllers: [BountyCollectionParticipantController],
  providers: [BountyCollectionParticipantService],
  exports: [BountyCollectionParticipantService],
})
export class BountyCollectionParticipantModule {}
