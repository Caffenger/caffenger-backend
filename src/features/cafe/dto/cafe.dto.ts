import { IsNotEmpty, IsString } from 'class-validator';

export class GetCafesForUserMinimalDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class OneCafeDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class CreateCafeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
