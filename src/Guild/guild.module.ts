import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Guild, GuildSchema } from './guild.schema';
import { GuildController } from './guild.controller';
import { GuildService } from './guild.service';
import { GuildSchedule } from './guild.schedule';
import { GuildEvent } from './guild.event';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }]),
  ],
  controllers: [GuildController],
  providers: [GuildService, GuildSchedule, GuildEvent],
  exports: [GuildService],
})
export class GuildModule {}
