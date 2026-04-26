import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
