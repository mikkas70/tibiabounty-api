import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class BountyCollectionParticipant {
  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  character: string;

  @Prop({ type: Types.ObjectId, ref: 'BountyCollection', required: true })
  bounty_collection: boolean;

  @Prop({ required: true })
  rank: number;
}

export type BountyCollectionParticipantDocument =
  HydratedDocument<BountyCollectionParticipant>;

export const BountyCollectionParticipantSchema = SchemaFactory.createForClass(
  BountyCollectionParticipant,
);
