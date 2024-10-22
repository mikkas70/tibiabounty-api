import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TibiaService } from './tibia.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TibiaSchedule {
  private readonly logger = new Logger(TibiaSchedule.name);

  constructor(
    private readonly tibiaService: TibiaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Cron('*/15 * * *  * *')
  async handleFetchingNewWorlds() {
    this.logger.debug('Checking for new worlds...');

    this.tibiaService.worlds().then(async (worlds) => {
      worlds.map(async (world) => {
        this.eventEmitter.emit('world.found', world);
      });
    });
  }
}
