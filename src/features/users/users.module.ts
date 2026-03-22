import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '@/lib/prisma/prisma.module';
import { UsersController } from './users.controller';
import { CafeModule } from '../cafe/cafe.module';

@Module({
  imports: [PrismaModule, CafeModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
