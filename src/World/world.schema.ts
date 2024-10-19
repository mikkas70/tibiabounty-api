import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { PvpType } from './enums/pvpType';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class World {
  _id: string;

  @Factory((faker) => faker.word.words(1))
  @Prop({ required: true, unique: true })
  name: string;

  @Factory(
    () =>
      PvpType[
        Object.keys(PvpType)[
          Math.floor(Math.random() * Object.keys(PvpType).length)
        ]
      ],
  )
  @Prop({ required: true })
  pvp_type: string;
}

export type WorldDocument = HydratedDocument<World>;
export const WorldSchema = SchemaFactory.createForClass(World);
