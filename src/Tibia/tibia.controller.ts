import { Controller, Get, Param } from '@nestjs/common';
import { TibiaService } from './tibia.service';
import { ICharacter } from './interfaces/Character';

@Controller('tibia')
export class TibiaController {
  constructor(private readonly tibiaService: TibiaService) {}

  @Get('/character/:name')
  async read(@Param('name') name: string): Promise<ICharacter> {
    return await this.tibiaService.character(name);
  }
}
