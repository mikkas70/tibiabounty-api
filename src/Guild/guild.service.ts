import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOT_FOUND_EXCEPTION } from '../exceptions';
import { Guild, GuildDocument } from './guild.schema';
import { CreateGuildDto } from './dto/createGuildDto';
import { World } from '../World/world.schema';

@Injectable()
export class GuildService {
  constructor(
    @InjectModel(Guild.name)
    private guild: Model<GuildDocument>,
  ) {}

  /**
   * Create a new guild
   * @param guild
   */
  async create(guild: CreateGuildDto): Promise<Guild> {
    return await new this.guild(guild).save();
  }

  async getByName(name: string, world: World): Promise<Guild> {
    const guild = await this.guild
      .findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        world: world._id,
      })
      .exec();

    if (!guild) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    return guild;
  }

  /**
   * Get a guild by id
   * @param id
   * @throws NotFoundException
   */
  async getById(id: string): Promise<Guild> {
    const guild = await this.guild.findById(id).exec();

    if (!guild) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    return guild;
  }
}
