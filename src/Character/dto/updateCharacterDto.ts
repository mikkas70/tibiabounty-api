import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { World } from '../../World/world.schema';
import { Guild } from '../../Guild/guild.schema';
import { Vocation } from '../enums/vocation';

export class UpdateCharacterDto {
  @IsNotEmpty()
  @IsString()
  world: World;

  @IsString()
  guild: Guild;

  @IsString()
  guild_rank: string;

  @IsNotEmpty()
  @IsBoolean()
  is_online: boolean;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  level: number;

  @IsNotEmpty()
  @IsEnum(Vocation)
  vocation: string;
}
