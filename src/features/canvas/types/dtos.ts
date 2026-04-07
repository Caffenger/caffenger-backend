import { IsNotEmpty, IsNumber } from 'class-validator';

export class CanvasDto {
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  width: number;
}
