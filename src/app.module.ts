import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorldModule } from './World/world.module';
import { CharacterModule } from './Character/character.module';
import { TibiaModule } from './Tibia/tibia.module';
import { GuildModule } from './Guild/guild.module';
import { BountyModule } from './Bounty/bounty.module';
import { BountyContractModule } from './BountyContract/bountyContract.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/tibiabounty'),
    TibiaModule,
    WorldModule,
    CharacterModule,
    GuildModule,
    BountyModule,
    BountyContractModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
