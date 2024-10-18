import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationService } from './services/Application/Application.service';
import { WorldModule } from './World/world.module';
import { CharacterModule } from './Character/character.module';
import { TibiaModule } from './Tibia/tibia.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    WorldModule,
    CharacterModule,
    TibiaModule,
  ],
  controllers: [],
  providers: [ApplicationService, AppService],
})
export class AppModule {}
