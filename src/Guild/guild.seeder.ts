import { DataFactory, Seeder } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guild } from './guild.schema';
import { World } from '../World/world.schema';

@Injectable()
export class GuildSeeder implements Seeder {
  constructor(
    @InjectModel(Guild.name) private readonly guild: Model<Guild>,
    @InjectModel(World.name) private readonly world: Model<World>,
  ) {}

  async seed(): Promise<void> {
    const worlds = await this.world.find().exec();
    const guilds = DataFactory.createForClass(Guild).generate(20);

    await Promise.all(
      guilds.map(async (guild) => {
        await this.guild.create({
          ...guild,
          world_id: worlds[Math.floor(Math.random() * worlds.length)],
        });
      }),
    );
  }

  drop(): Promise<any> {
    return this.guild.deleteMany({});
  }
}
