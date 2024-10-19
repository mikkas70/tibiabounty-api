import { IsNotEmpty, IsString } from 'class-validator';
import { World } from '../../World/world.schema';

export class CreateGuildDto {
  @IsNotEmpty()
  world: World;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo_url: string;
}
