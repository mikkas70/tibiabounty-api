import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './character.schema';
import { CharacterController } from './character.controller';
import { TibiaApiModule } from '../services/TibiaApi/tibiaApi.module';

@Module({
  imports: [
    TibiaApiModule,
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
  ],
  controllers: [CharacterController],
  providers: [],
})
export class CharacterModule {}
