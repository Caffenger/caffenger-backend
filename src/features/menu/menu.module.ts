import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaModule } from '@/lib/prisma/prisma.module';
import { MenuItemModule } from '../menu-item/menu-item.module';

@Module({
  imports: [PrismaModule, MenuItemModule],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
