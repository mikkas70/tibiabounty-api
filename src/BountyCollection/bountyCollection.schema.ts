import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class BountyCollection {
  @Prop({ type: Types.ObjectId, ref: 'Bounty', required: true })
  bounty: string;

  @Prop({ required: false, default: false })
  is_paid: number;

  @Prop({ required: false, default: false })
  is_eligible: number;

  @Prop({ required: false })
  eligible_reason: string;
}

export type BountyCollectionDocument = HydratedDocument<BountyCollection>;

export const BountyCollectionSchema =
  SchemaFactory.createForClass(BountyCollection);
