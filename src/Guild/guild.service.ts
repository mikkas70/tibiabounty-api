import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOT_FOUND_EXCEPTION } from '../constants/Exceptions';
import { Guild, GuildDocument } from './guild.schema';

@Injectable()
export class GuildService {
  constructor(
    @InjectModel(Guild.name)
    private guildModel: Model<GuildDocument>,
  ) {}

  /**
   * Get a guild by id
   * @param id
   * @throws NotFoundException
   */
  async getById(id: string): Promise<Guild> {
    const guild = await this.guildModel.findById(id).exec();

    if (!guild) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    return guild;
  }
}
