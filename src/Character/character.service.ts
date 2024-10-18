import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOT_FOUND_EXCEPTION } from '../constants/Exceptions';
import { Character, CharacterDocument } from './character.schema';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  /**
   * Get a character by id
   * @param id
   * @throws NotFoundException
   */
  async getById(id: string): Promise<Character> {
    const character = await this.characterModel.findById(id).exec();

    if (!character) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    return character;
  }
}
