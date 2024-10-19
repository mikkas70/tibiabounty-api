import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BountyStatus } from './enums/bountyStatus';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Bounty {
  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  target_character_id: string;

  // TODO - HIDDEN IF IS_ANONYMOUS
  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  requester_character_id: string;

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
