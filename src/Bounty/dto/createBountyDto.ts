import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateBountyDto {
  @IsString()
  @IsNotEmpty()
  target_character: string;

  @IsString()
  @IsNotEmpty()
  requester_character: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  value: number;

  @IsDate()
  @IsNotEmpty()
  expires_at: Date;
}
