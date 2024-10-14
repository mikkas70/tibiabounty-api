import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class World {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  pvpType: number;
}

export type WorldDocument = HydratedDocument<World>;
export const WorldSchema = SchemaFactory.createForClass(World);
