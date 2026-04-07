import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
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
  async getCanvases(@Param('floorId') floorId: string) {
    const floorCanvases = await this.canvasService.getAllFloorCanvases(floorId);

    if (!floorCanvases)
      throw new NotFoundException('Floor does not have created canvases');

    return floorCanvases;
  }

  @Get(CANVAS_ROUTES.BY_ID)
  async getCanvas(@Param('canvasId') canvasId: string) {
    const floorCanvas = await this.canvasService.getCanvasByCanvasId(canvasId);

    if (!floorCanvas)
      throw new InternalServerErrorException('Error loading canvas');

    return floorCanvas;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(CANVAS_ROUTES.BY_ID)
  async deleteCanvas(@Param('canvasId') canvasId: string) {
    const deletedCanvas = await this.canvasService.deleteCanvas(canvasId);

    if (!deletedCanvas)
      throw new InternalServerErrorException('Error deleting canvas');

    return HttpStatus.NO_CONTENT;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(CANVAS_ROUTES.BASE)
  async createCanvas(
    @Param('floorId') floorId: string,
    @Body() dto: CanvasDto,
  ) {
    const initializedCanvas = await this.canvasService.createCanvasForFloor(
      dto.height,
      dto.width,
      floorId,
    );

    if (!initializedCanvas)
      throw new InternalServerErrorException('Error creating new canvas');

    return initializedCanvas;
  }

  @Post(CANVAS_ROUTES.BY_ID)
  async updateCanvas(
    @Param('canvasId') canvasId: string,
    @Body() dto: CanvasDto,
  ) {
    const updatedDimensionsCanvas = await this.canvasService.updateCanvasSize(
      dto.height,
      dto.width,
      canvasId,
    );

    if (!updatedDimensionsCanvas)
      throw new InternalServerErrorException(
        'Failed to update canvas dimensions',
      );

    return updatedDimensionsCanvas;
  }
}
