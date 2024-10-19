import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Factory } from 'nestjs-seeder';
import { Vocation } from './enums/vocation';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Character {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'World', required: true })
  world: string;

  @Prop({ type: Types.ObjectId, ref: 'Guild', required: false })
  guild: string;

  @Factory((faker) => faker.word.words(2))
  @Prop({ required: false })
  guild_rank: string;

  @Factory((faker) => faker.datatype.boolean())
  @Prop({ required: true })
  is_online: boolean;

  @Factory((faker) => faker.number.int({ min: 100, max: 300 }))
  @Prop({ required: true })
  level: number;

  @Factory(
    () =>
      Object.values(Vocation)[
        Math.floor(Math.random() * Object.values(Vocation).length)
      ],
  )
  @Prop({ required: true })
  vocation: string;

  @Prop({ required: true, default: () => `tibiabounty-${uuidv4()}` })
  login_validation_string: string;

  @Prop({ required: true, default: () => '133_3' })
  look_id: string;
}

export type CharacterDocument = HydratedDocument<Character>;

export const CharacterSchema = SchemaFactory.createForClass(Character);
