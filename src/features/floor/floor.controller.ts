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
} from '@nestjs/common';
import { FloorService } from './floor.service';
import { CreateCafeFloorDto } from './types/dtos';
import { FLOOR_ROUTES } from './floor.routes';
import { CanvasService } from '../canvas/canvas.service';

@Controller(FLOOR_ROUTES.BASE)
export class FloorController {
  constructor(
    private readonly floorService: FloorService,
    private readonly canvasService: CanvasService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getCafeFloors(@Param('cafeId') cafeId: string) {
    const cafeFloors = this.floorService.getFloorsByCafeId({
      cafeId,
    });
    if (!cafeFloors) throw new NotFoundException();

    return cafeFloors;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createCafeFloor(
    @Param('cafeId') cafeId: string,
    @Body() createCafeFloorDto: CreateCafeFloorDto,
  ) {
    const newCafeFloor = await this.floorService.createCafeFloor(
      cafeId,
      createCafeFloorDto,
    );
    if (!newCafeFloor)
      throw new InternalServerErrorException({
        message: 'Failed to create new Cafe Floor',
      });

    //defaults to 10x10 meters
    const newFloorCanvas =
      await this.canvasService.generateDefaultCanvasForNewlyCreatedFloor(
        newCafeFloor.id,
      );

    if (!newFloorCanvas)
      throw new InternalServerErrorException({
        message: 'Failed to create canvas for new floor',
      });

    return newCafeFloor;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(FLOOR_ROUTES.BY_ID)
  async deleteCafeFloor(
    @Param('cafeId') cafeId: string,
    @Param('floorId') floorId: string,
  ) {
    const deletedCafeFloor = await this.floorService.deleteCafeFloorByFloorId(
      cafeId,
      floorId,
    );

    if (!deletedCafeFloor)
      throw new InternalServerErrorException({
        message: 'Error deleting Cafe Floor',
      });

    return deletedCafeFloor;
  }
}
