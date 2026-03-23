import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CafeService } from './cafe.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { CurrentUser } from '@/core/decorators/current-user.decorator';
import { CreateCafeDto } from './dto/cafe.dto';

@UseGuards(JwtAuthGuard)
@Controller('cafe')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

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
}
