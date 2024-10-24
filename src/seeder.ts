import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { WorldSeeder } from './World/world.seeder';
import { World, WorldSchema } from './World/world.schema';
import { GuildSeeder } from './Guild/guild.seeder';
import { Guild, GuildSchema } from './Guild/guild.schema';
import { CharacterSeeder } from './Character/character.seeder';
import { Character, CharacterSchema } from './Character/character.schema';
import {
  BountyContract,
  BountyContractSchema,
} from './BountyContract/bountyContract.schema';
import { BountyContractSeeder } from './BountyContract/bountyContract.seeder';

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/tibiabounty'),
    MongooseModule.forFeature([{ name: World.name, schema: WorldSchema }]),
    MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }]),
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
    MongooseModule.forFeature([
      { name: BountyContract.name, schema: BountyContractSchema },
    ]),
  ],
}).run([WorldSeeder, GuildSeeder, CharacterSeeder, BountyContractSeeder]);
