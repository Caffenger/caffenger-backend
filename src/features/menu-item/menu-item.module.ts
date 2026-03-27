import { Module } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItemController } from './menu-item.controller';
import { PrismaModule } from '@/lib/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MenuItemController],
  providers: [MenuItemService],
  exports: [MenuItemService],
})
export class MenuItemModule {}
