import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PvpType } from '../enums/pvpType';

export class CreateWorldDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(PvpType, { message: 'PvP type must be a valid enum value' })
  pvp_type: string;
}
