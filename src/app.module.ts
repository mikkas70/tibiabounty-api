import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorldModule } from './World/world.module';
import { CharacterModule } from './Character/character.module';
import { TibiaModule } from './Tibia/tibia.module';
import { GuildModule } from './Guild/guild.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    WorldModule,
    CharacterModule,
    GuildModule,
    TibiaModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
