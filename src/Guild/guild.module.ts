import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Guild, GuildSchema } from './guild.schema';
import { GuildController } from './guild.controller';
import { GuildService } from './guild.service';
import { GuildSchedule } from './guild.schedule';
import { WorldModule } from '../World/world.module';
import { TibiaModule } from '../Tibia/tibia.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }]),
    WorldModule,
    TibiaModule,
  ],
  controllers: [GuildController],
  providers: [GuildService, GuildSchedule],
  exports: [GuildService],
})
export class GuildModule {}
