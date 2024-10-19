import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class BountyCollector {
  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  character: string;

  @Prop({ type: Types.ObjectId, ref: 'Bounty', required: true })
  bounty: string;

  @Prop({ required: true })
  rank: number;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true, default: false })
  is_paid: number;
}

export type BountyCollectorDocument = HydratedDocument<BountyCollector>;

export const BountyCollectorSchema =
  SchemaFactory.createForClass(BountyCollector);
