import { Cron } from '@nestjs/schedule';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { WorldService } from './world.service';
import { TibiaService } from '../Tibia/tibia.service';

@Injectable()
export class WorldSchedule {
  private readonly logger = new Logger(WorldSchedule.name);

  constructor(
    private readonly worldService: WorldService,
    private readonly tibiaService: TibiaService,
  ) {}

  @Cron('* */60 * * * *')
  async handleWorldsUpdate() {
    this.logger.debug('Checking for new worlds...');

    this.tibiaService.worlds().then(async (worlds) => {
      worlds.map(async (world) => {
        try {
          await this.worldService.getByName(world.name);
        } catch (error) {
          if (error instanceof NotFoundException) {
            this.logger.debug(`Creating new world: ${world.name}...`);
            await this.worldService.create(world);
          }
        }
      });
    });
  }
}
