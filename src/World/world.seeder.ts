import { DataFactory, Seeder } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { World } from './world.schema';
import { Model } from 'mongoose';

@Injectable()
export class WorldSeeder implements Seeder {
  constructor(@InjectModel(World.name) private readonly world: Model<World>) {}

  seed(): Promise<any> {
    const worlds = DataFactory.createForClass(World).generate(10);
    return this.world.insertMany(worlds);
  }

  drop(): Promise<any> {
    return this.world.deleteMany({});
  }
}
