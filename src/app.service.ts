import {
  Injectable,
  Logger,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { WorldService } from './World/world.service';
import { TibiaService } from './Tibia/tibia.service';
import { GuildService } from './Guild/guild.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly tibiaService: TibiaService,
    private readonly worldService: WorldService,
    private readonly guildService: GuildService,
  ) {}

  async onApplicationBootstrap() {
    this.logger.debug('Application fetching critical data...');

    await this.tibiaService.worlds().then((worlds) => {
      worlds.map(async (world) => {
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
    });

    const worlds = await this.worldService.getAll();

    worlds.map(async (world) => {
      await this.tibiaService.guilds(world.name).then((guilds) => {
        guilds.map(async (guild) => {
          try {
            await this.guildService.getByName(guild.name, world);
          } catch (error) {
            if (error instanceof NotFoundException) {
              await this.guildService.create({ ...guild, world: world });
            } else {
              this.logger.error(error.message);
              throw error;
            }
          }
        });
      });
    });

    this.logger.debug('Finished fetching critical data...');
  }
}
