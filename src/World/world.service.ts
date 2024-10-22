import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { World, WorldDocument } from './world.schema';
import { NOT_FOUND_EXCEPTION } from '../exceptions';
import { CreateWorldDto } from './dto/createWorldDto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class WorldService {
  constructor(
    @InjectModel(World.name) private world: Model<WorldDocument>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Create a new world
   */
  async create(createWorldDto: CreateWorldDto): Promise<void> {
    await new this.world(createWorldDto).save().then((world) => {
      this.eventEmitter.emit('world.created', world);
    });
  }

  /**
   * Get a world by name
   * @param name
   * @throws NotFoundException
   */
  async getByName(name: string): Promise<World> {
    const world = await this.world
      .findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } })
      .exec();

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
    const world = await this.world.findById(id).exec();

    if (!world) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    return world;
  }

  /**
   * Get all worlds
   */
  async getAll(): Promise<World[]> {
    return this.world.find().sort('name').exec();
  }
}
