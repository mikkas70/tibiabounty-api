import {
  Injectable,
  Logger,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { WorldService } from './World/world.service';
import { TibiaService } from './Tibia/tibia.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly tibiaService: TibiaService,
    private readonly worldService: WorldService,
  ) {}

  async onApplicationBootstrap() {
    this.logger.debug('Application fetching critical data...');

    (await this.tibiaService.worlds()).map(async (world) => {
      try {
        await this.worldService.getByName(world.name);
      } catch (error) {
        if (error instanceof NotFoundException) {
          await this.worldService.create(world);
        } else {
          this.logger.error(error.message);
          throw error;
        }
      }
    });

    this.logger.debug('Finished fetching critical data...');
  }
}
