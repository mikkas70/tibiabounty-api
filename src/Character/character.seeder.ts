import { DataFactory, Seeder } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './character.schema';
import { Guild } from '../Guild/guild.schema';
import { World } from '../World/world.schema';

@Injectable()
export class CharacterSeeder implements Seeder {
  constructor(
    @InjectModel(Character.name) private readonly character: Model<Character>,
    @InjectModel(Guild.name) private readonly guild: Model<Guild>,
    @InjectModel(World.name) private readonly world: Model<World>,
  ) {}

  async seed(): Promise<void> {
    const worlds = await this.world.find().exec();
    const guilds = await this.guild.find().exec();

    const names = [
      'Sercera Abul',
      'Outcast Shooter',
      'Nayde Blashyda',
      'Charlie Sierra',
      'Teteu Novinho',
      'Johansinhox',
      'Orcfighter',
      'Pil Diddy',
      'Ek Tiger',
    ];

    await Promise.all(
      names.map(async (name) => {
        const character = DataFactory.createForClass(Character)
          .generate(1)
          .at(0);

        await this.character.create({
          ...character,
          name,
          world: worlds[Math.floor(Math.random() * worlds.length)],
          guild:
            Math.random() < 0.5
              ? guilds[Math.floor(Math.random() * guilds.length)]
              : null,
        });
      }),
    );
  }

  drop(): Promise<any> {
    return this.character.deleteMany({});
  }
}
