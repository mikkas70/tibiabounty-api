import { Controller, Get } from '@nestjs/common';
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
  async read(name: string): Promise<World> {
    return await this.worldService.getByName(name);
  }
}
