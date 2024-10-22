import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { GuildService } from './guild.service';
import { IGuild } from '../Tibia/interfaces/IGuild';
import { World } from '../World/world.schema';

@Injectable()
export class GuildEvent {
  private readonly logger = new Logger(GuildEvent.name);

  constructor(
    private readonly guildService: GuildService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('guild.found')
  async handleGuildFound(guild: IGuild, world: World) {
    try {
      await this.guildService.getByName(guild.name, world);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.debug(
          `Creating new guild: ${guild.name} on ${world.name}...`,
        );
        await this.guildService.create({ ...guild, world: world });
      }
    }
  }
}
