import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CafeService } from '../cafe/cafe.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { CurrentUser } from '@/core/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private cafeService: CafeService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/profile/')
  async userProfile(@CurrentUser('sub') userId: string) {
    const userCafes = await this.cafeService.getAllUserCafes(userId);

    return userCafes;
  }
}
