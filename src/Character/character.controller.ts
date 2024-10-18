import { Controller, Get, Param } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from './character.schema';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get('/read/:id')
  async read(@Param('id') id: string): Promise<Character> {
    return await this.characterService.getById(id);
  }
}
