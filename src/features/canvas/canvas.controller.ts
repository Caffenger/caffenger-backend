import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { CANVAS_ROUTES } from './canvas.routes';
import { CanvasDto } from './types/dtos';

@UseGuards(JwtAuthGuard)
@Controller(CANVAS_ROUTES.BASE)
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Get()
  async getFloorCanvas(@Param('floorId') floorId: string) {
    const floorCanvas = await this.canvasService.getCanvasByFloorId(floorId);

    if (!floorCanvas)
      throw new InternalServerErrorException('Error loading canvas');

    return floorCanvas;
  }

  @Post(CANVAS_ROUTES.BY_ID)
  async updateCanvas(
    @Param('floorId') floorId: string,
    @Body() dto: CanvasDto,
  ) {
    const updatedDimensionsCanvas = await this.canvasService.updateCanvasSize(
      dto.height,
      dto.width,
      floorId,
    );

    if (!updatedDimensionsCanvas)
      throw new InternalServerErrorException(
        'Failed to update canvas dimensions',
      );

    return updatedDimensionsCanvas;
  }
}
