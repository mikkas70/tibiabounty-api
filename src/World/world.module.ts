import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorldController } from './world.controller';
import { World, WorldSchema } from './world.schema';
import { WorldService } from './world.service';
import { TibiaModule } from '../Tibia/tibia.module';
import { WorldEvent } from './world.event';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: World.name, schema: WorldSchema }]),
    TibiaModule,
  ],
  controllers: [WorldController],
  providers: [WorldService, WorldEvent],
  exports: [WorldService],
})
export class WorldModule {}
