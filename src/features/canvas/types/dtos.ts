import { ObjectTypeEnum } from '@/generated/prisma/enums';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CanvasDto {
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  width: number;
}

export class SaveCanvasObjectDto {
  @IsString()
  @IsNotEmpty()
  tempId: string;

  @IsString()
  @IsOptional()
  id?: string;

  @IsNumber()
  @IsNotEmpty()
  pos_x_first: number;

  @IsNumber()
  @IsNotEmpty()
  pos_y_first: number;

  @IsNumber()
  @IsNotEmpty()
  pos_x_second: number;

  @IsNumber()
  @IsNotEmpty()
  pos_y_second: number;

  @IsEnum(ObjectTypeEnum)
  @IsNotEmpty()
  objectType: ObjectTypeEnum;

  @IsOptional()
  metadata?: any;
}

export class SaveCanvasDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveCanvasObjectDto)
  objects: SaveCanvasObjectDto[];
}
