import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class BountyCollection {
  @Prop({ type: Types.ObjectId, ref: 'Bounty', required: true })
  bounty_id: string;

  @Prop({ required: true })
  is_eligible: boolean;

  @Prop({ required: false, default: false })
  is_paid: number;

  @Prop({ required: false })
  eligible_reason: string;
}

export type BountyCollectionDocument = HydratedDocument<BountyCollection>;

export const BountyCollectionSchema =
  SchemaFactory.createForClass(BountyCollection);
