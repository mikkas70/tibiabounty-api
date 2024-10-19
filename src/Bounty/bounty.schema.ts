import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BountyStatus } from './enums/bountyStatus';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Bounty {
  _id: string;

  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  target_character: string;

  // TODO - HIDDEN IF IS_ANONYMOUS
  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  requester_character: string;

  @Prop({ required: true, default: false })
  is_anonymous: boolean;

  @Prop({ required: true, default: BountyStatus.ACTIVE })
  status: number;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  expires_at: Date;
}

export type BountyDocument = HydratedDocument<Bounty>;

export const BountySchema = SchemaFactory.createForClass(Bounty);
