import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { WorldSeeder } from './World/world.seeder';
import { World, WorldSchema } from './World/world.schema';
import { GuildSeeder } from './Guild/guild.seeder';
import { Guild, GuildSchema } from './Guild/guild.schema';

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/tibiabounty'),
    MongooseModule.forFeature([{ name: World.name, schema: WorldSchema }]),
    MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }]),
  ],
}).run([WorldSeeder, GuildSeeder]);
