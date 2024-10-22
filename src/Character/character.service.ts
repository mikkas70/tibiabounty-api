import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CHARACTER_ALREADY_EXISTS, NOT_FOUND_EXCEPTION } from '../exceptions';
import { Character, CharacterDocument } from './character.schema';
import * as dayjs from 'dayjs';
import { CreateCharacterDto } from './dto/createCharacterDto';
import { UpdateCharacterDto } from './dto/updateCharacterDto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private character: Model<CharacterDocument>,
  ) {}

  /**
   * Create a new character withing the database
   * @param createCharacterDto
   */
  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const exists = await this.character.exists({
      name: new RegExp(`^${createCharacterDto.name}$`, 'i'),
    });

    if (exists) {
      throw new HttpException(CHARACTER_ALREADY_EXISTS, 400);
    }

    const character = new this.character();

    character.name = createCharacterDto.name;
    character.world = createCharacterDto.world._id;
    character.guild = createCharacterDto.guild?._id;
    character.guild_rank = createCharacterDto?.guild_rank;
    character.level = createCharacterDto.level;
    character.vocation = createCharacterDto.vocation;
    character.is_online = createCharacterDto.is_online;

    return character.save();
  }

  /**
   * Update a character with new information
   * @param id
   * @param updateCharacterDto
   */
  async update(
    id: string,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    const character = await this.character.findById(id).exec();

    if (!character) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    character.world = updateCharacterDto.world._id;
    character.guild = updateCharacterDto.guild?._id;
    character.guild_rank = updateCharacterDto.guild_rank;
    character.level = updateCharacterDto.level;
    character.vocation = updateCharacterDto.vocation;
    character.is_online = updateCharacterDto.is_online;

    return character.save();
  }

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
