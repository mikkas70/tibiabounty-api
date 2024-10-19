import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'World', required: true })
  world_id: string;

  @Prop({ type: Types.ObjectId, ref: 'Guild', required: false })
  guild_id: string;

  @Prop({ required: false })
  guild_rank: string;

  @Prop({ required: true })
  is_online: boolean;

  @Prop({ required: true })
  level: number;

  @Prop({ required: true })
  vocation: string;

  @Prop({ required: true, default: () => `tibiabounty-${uuidv4()}` })
  login_validation_string: string;

  @Prop({ required: true, default: () => '133_3' })
  look_id: string;
}

export type CharacterDocument = HydratedDocument<Character>;

export const CharacterSchema = SchemaFactory.createForClass(Character);
