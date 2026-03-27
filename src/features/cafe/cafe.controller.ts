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
import { CafeService } from './cafe.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { CurrentUser } from '@/core/decorators/current-user.decorator';
import { CreateCafeDto } from './dto/cafe.dto';
import { CAFE_ROUTES } from './cafe.routes';

@UseGuards(JwtAuthGuard)
@Controller(CAFE_ROUTES.BASE)
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Get(CAFE_ROUTES.BY_ID)
  async getCafe(@Param('cafeId') cafeId: string) {
    const cafe = await this.cafeService.getCafe({
      id: cafeId,
    });

    if (!cafe) throw new NotFoundException('Cafe not found');

    return cafe;
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async createCafe(
    @CurrentUser('sub') userId: string,
    @Body() createCafeDto: CreateCafeDto,
  ) {
    const newCafe = await this.cafeService.createCafe(
      userId,
      createCafeDto.name,
    );

    if (!newCafe)
      throw new InternalServerErrorException('Failed to create cafe');

    return newCafe;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(CAFE_ROUTES.BY_ID)
  async deleteCafe(@Param('cafeId') cafeId: string) {
    const deletedCafe = await this.cafeService.deleteCafe(cafeId);

    if (!deletedCafe) throw new NotFoundException();

    return deletedCafe;
  }
}
