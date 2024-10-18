import { Controller, Get, Param } from '@nestjs/common';
import { WorldService } from './world.service';
import { World } from './world.schema';

@Controller('world')
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Get('/list')
  async list(): Promise<World[]> {
    return await this.worldService.getAll();
  }

  @Get('/read/:id')
  async read(@Param('id') id: string): Promise<World> {
    return await this.worldService.getById(id);
  }
}
