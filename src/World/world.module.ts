import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorldController } from './world.controller';
import { World, WorldSchema } from './world.schema';
import { TibiaApiModule } from '../services/TibiaApi/tibiaApi.module';
import { WorldService } from './world.service';

@Module({
  imports: [
    TibiaApiModule,
    MongooseModule.forFeature([{ name: World.name, schema: WorldSchema }]),
  ],
  controllers: [WorldController],
  providers: [WorldService],
})
export class WorldModule {}
