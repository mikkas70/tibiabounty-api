import { Injectable } from '@nestjs/common';

@Injectable()
export class GuildSchedule {
  /*private readonly logger = new Logger(GuildSchedule.name);
  
    constructor(
      private readonly worldService: WorldService,
      private readonly guildService: GuildService,
      private readonly tibiaService: TibiaService,
    ) {}
  
    async handleGuildsUpdate() {
      this.logger.debug('Checking for new guilds...');
  
      const worlds = await this.worldService.getAll();
  
      worlds.map(async (world) => {
        this.tibiaService.guilds(world.name).then(async (guilds) => {
          guilds.map(async (guild) => {
            try {
              await this.guildService.getByName(guild.name, world);
            } catch (error) {
              if (error instanceof NotFoundException) {
                await this.guildService.create({ ...guild, world: world });
              }
            }
          });
        });
      });
    }*/
}
