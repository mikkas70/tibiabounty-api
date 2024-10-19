import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class BountyCollectionParticipant {
  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  character_id: string;

  @Prop({ type: Types.ObjectId, ref: 'BountyCollection', required: true })
  bounty_collection_id: boolean;

  @Prop({ required: true })
  rank: number;
}

export type BountyCollectionParticipantDocument =
  HydratedDocument<BountyCollectionParticipant>;

export const BountyCollectionParticipantSchema = SchemaFactory.createForClass(
  BountyCollectionParticipant,
);
