import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Factory } from 'nestjs-seeder';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class BountyContract {
  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  target_character: string;

  @Prop({ type: Types.ObjectId, ref: 'Character', required: true })
  requester_character: string;

  @Prop({ type: Types.ObjectId, ref: 'Bounty', required: false })
  bounty: string;

  @Factory((faker) => faker.datatype.boolean())
  @Prop({ required: true, default: false })
  is_paid: boolean;

  @Factory((faker) => faker.datatype.boolean())
  @Prop({ required: true, default: false })
  is_returned: boolean;

  @Factory((faker) => faker.datatype.boolean())
  @Prop({ required: true, default: false })
  is_anonymous: boolean;

  @Factory((faker) => faker.number.int({ min: 500, max: 1500 }))
  @Prop({ required: true })
  value: number;

  @Factory((faker) => faker.date.soon({ days: 30 }))
  @Prop({ required: true })
  expires_at: Date;
}

export type BountyContractDocument = HydratedDocument<BountyContract>;

export const BountyContractSchema =
  SchemaFactory.createForClass(BountyContract);
