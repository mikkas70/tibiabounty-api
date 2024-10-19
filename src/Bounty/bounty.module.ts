import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bounty, BountySchema } from './bounty.schema';
import { BountyService } from './bounty.service';
import { BountyController } from './bounty.controller';
import { TibiaModule } from '../Tibia/tibia.module';
import { CharacterModule } from '../Character/character.module';
import { BountySchedule } from './bounty.schedule';

@Module({
  imports: [
    TibiaModule,
    CharacterModule,
    MongooseModule.forFeature([{ name: Bounty.name, schema: BountySchema }]),
  ],
  controllers: [BountyController],
  providers: [BountyService, BountySchedule],
  exports: [BountyService],
})
export class BountyModule {}
