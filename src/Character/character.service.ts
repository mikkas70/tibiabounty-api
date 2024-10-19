import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOT_FOUND_EXCEPTION } from '../exceptions';
import { Character, CharacterDocument } from './character.schema';
import * as dayjs from 'dayjs';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private character: Model<CharacterDocument>,
  ) {}

  /**
   * Get a character by id
   * @param id
   * @throws NotFoundException
   */
  async getById(id: string): Promise<Character> {
    const character = await this.character.findById(id).exec();

    if (!character) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    return character;
  }

  /**
   * Get a character by name
   * @param name
   * @throws NotFoundException
   */
  async getByName(name: string): Promise<Character> {
    const character = await this.character
      .findOne({ name: new RegExp(`^${name}$`, 'i') })
      .exec();

    if (!character) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    return character;
  }

  /**
   * Get a character that needs to be updated with API information.
   */
  async getStale(): Promise<Character[]> {
    const now = dayjs();

    return this.character
      .find({ updated_at: { $lt: now.subtract(5, 'minute') } })
      .exec();
  }
}
