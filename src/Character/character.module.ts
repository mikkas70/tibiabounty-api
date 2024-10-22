import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './character.schema';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CharacterSchedule } from './character.schedule';
import { BullModule } from '@nestjs/bullmq';
import { CharacterConsumer } from './character.consumer';
import { TibiaModule } from '../Tibia/tibia.module';
import { GuildModule } from '../Guild/guild.module';
import { WorldModule } from '../World/world.module';
import { BountyModule } from '../Bounty/bounty.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
    BullModule.registerQueue({
      name: 'character',
    }),
    TibiaModule,
    GuildModule,
    WorldModule,
    BountyModule,
  ],
  controllers: [CharacterController],
  providers: [CharacterService, CharacterSchedule, CharacterConsumer],
  exports: [CharacterService],
})
export class CharacterModule {}
