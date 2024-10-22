import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { BountyStatus } from '../enums/bountyStatus';

export class CreateBountyDto {
  @IsString()
  @IsNotEmpty()
  target_character: string;

  @IsString()
  @IsNotEmpty()
  requester_character: string;

  @IsBoolean()
  @IsNotEmpty()
  is_anonymous: boolean;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  value: number;

  @IsEnum(BountyStatus)
  status: number;

  @IsDate()
  @IsNotEmpty()
  expires_at: Date;
}
