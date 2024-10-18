import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorldController } from './world.controller';
import { World, WorldSchema } from './world.schema';
import { WorldService } from './world.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: World.name, schema: WorldSchema }]),
  ],
  controllers: [WorldController],
  providers: [WorldService],
})
export class WorldModule {}
