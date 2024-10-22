import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class BountyContractPaidEvent {
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
}
