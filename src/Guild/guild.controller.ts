import { Controller, Get, Param } from '@nestjs/common';
import { GuildService } from './guild.service';
import { Guild } from './guild.schema';

@Controller('guild')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Get('/read/:id')
  async read(@Param('id') id: string): Promise<Guild> {
    return await this.guildService.getById(id);
  }
}
