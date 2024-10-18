import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { World, WorldDocument } from './world.schema';
import { NOT_FOUND_EXCEPTION } from '../constants/Exceptions';

@Injectable()
export class WorldService {
  constructor(
    @InjectModel(World.name) private worldModel: Model<WorldDocument>,
  ) {}

  /**
   * Get a world by name
   * @param name
   * @throws NotFoundException
   */
  async getByName(name: string): Promise<World> {
    const world = await this.worldModel.findOne({ name }).exec();

    if (!world) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    return world;
  }

  /**
   * Get a world by id
   * @param id
   * @throws NotFoundException
   */
  async getById(id: string): Promise<World> {
    const world = await this.worldModel.findById(id).exec();

    if (!world) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    return world;
  }

  /**
   * Get all worlds
   */
  async getAll(): Promise<World[]> {
    return this.worldModel.find().exec();
  }
}
