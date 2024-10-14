import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Contract {
  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  characterId: string;

  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  placedBy: string;

  @Prop({ required: true, min: 0 })
  bounty: number;

  @Prop({ required: true })
  isAnonymous: boolean = false;

  @Prop({ required: true })
  expiresAt: Date;
}

export type ContractDocument = HydratedDocument<Contract>;

export const ContractSchema = SchemaFactory.createForClass(Contract);
