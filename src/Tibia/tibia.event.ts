import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { World } from '../World/world.schema';
import { TibiaService } from './tibia.service';

@Injectable()
export class TibiaEvent {
  private readonly logger = new Logger(TibiaEvent.name);

  constructor(
    private readonly tibiaService: TibiaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('guild.fetch')
  async handleGuildFetch(world: World) {
    this.tibiaService.guilds(world.name).then(async (guilds) => {
      guilds.map(async (guild) => {
        this.eventEmitter.emit('guild.found', guild, world);
      });
    });
  }
}
