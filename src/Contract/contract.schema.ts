import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Contract {
  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  target_character_id: string;

  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  requester_character_id: string;

  @Prop({ type: Types.ObjectId, ref: 'Bounty', required: false })
  bounty_id: string;

  @Prop({ required: true, default: false })
  is_anonymous: boolean;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  expires_at: Date;
}

export type ContractDocument = HydratedDocument<Contract>;

export const ContractSchema = SchemaFactory.createForClass(Contract);
