import { ObjectTypeEnum } from '@/generated/prisma/enums';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateCafeObjectDto {
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

  @IsOptional()
  metadata?: any; // Create custom JSON interface for metadata

  @IsEnum(ObjectTypeEnum)
  @IsNotEmpty()
  objectType: ObjectTypeEnum;

  @IsInt()
  @IsNotEmpty()
  canvasId: number;
}
