import { MenuItemType } from '@/generated/prisma/enums';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class MutateMenuItemDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsEnum(MenuItemType)
  type?: MenuItemType;
}

export class MutateMenuAndItemRelationDto {
  @IsOptional()
  @IsString()
  menuId?: string;

  @IsNotEmpty()
  @IsString()
  menuItemId: string;
}
