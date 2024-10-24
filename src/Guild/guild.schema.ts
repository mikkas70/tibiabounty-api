import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Factory } from 'nestjs-seeder';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Guild {
  _id: string;

  @Factory((faker) => faker.word.words(1))
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'World', required: true })
  world: string;

  @Factory((faker) => faker.image.avatar())
  @Prop({ required: false })
  logo_url: string;
}

export type GuildDocument = HydratedDocument<Guild>;

export const GuildSchema = SchemaFactory.createForClass(Guild);
