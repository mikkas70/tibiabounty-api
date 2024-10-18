import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Guild {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'World', required: true })
  world_id: string;

  @Prop({ required: false })
  logo_url: string;
}

export type GuildDocument = HydratedDocument<Guild>;

export const GuildSchema = SchemaFactory.createForClass(Guild);
