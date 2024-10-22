import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { WorldService } from './world.service';
import { IWorld } from '../Tibia/interfaces/World';
import { TibiaSchedule } from '../Tibia/tibia.schedule';

@Injectable()
export class WorldEvent {
  private readonly logger = new Logger(TibiaSchedule.name);

  constructor(
    private readonly worldService: WorldService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('world.found')
  async handleWorldFound(worldApi: IWorld) {
    try {
      const world = await this.worldService.getByName(worldApi.name);
      this.eventEmitter.emit('guild.fetch', world);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.debug(`Creating new world: ${worldApi.name}...`);
        await this.worldService.create(worldApi);
      }
    }
  }
}
