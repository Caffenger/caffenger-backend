import { Controller, Get, Param } from '@nestjs/common';
import { CafeService } from '../cafe/cafe.service';

@Controller('users')
export class UsersController {
  constructor(private cafeService: CafeService) {}

  @Get('/profile/:userId')
  async userProfile(@Param('userId') userId: string) {}
}
