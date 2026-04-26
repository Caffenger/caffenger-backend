import { IsNotEmpty, IsString } from 'class-validator';

export class GetCafeFloorsDto {
  @IsString()
  @IsNotEmpty()
  cafeId: string;
}

export class CreateCafeFloorDto {
  @IsString()
  @IsNotEmpty()
  cafeFloorName: string;
}

export class UpdateCafeFloorDto {
  @IsString()
  @IsNotEmpty()
  cafeId: string;

  @IsString()
  @IsNotEmpty()
  cafeFloorId: string;

  @IsString()
  @IsNotEmpty()
  cafeFloorName: string;
}
