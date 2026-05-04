import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/lib/prisma/prisma.service';
import { MutateMenuAndItemRelationDto, MutateMenuItemDto } from './dtos/dto';

@Injectable()
export class MenuItemService {
  constructor(private prismaService: PrismaService) {}

  async getManyByCafeId(cafeId: string) {
    return await this.prismaService.menuItem.findMany({
      where: { cafeId },
    });
  }

  async getManyByMenuId(menuId: string) {
    return await this.prismaService.menuItem.findMany({
      where: {
        entries: {
          some: { menuId },
        },
      },
    });
  }

  async mutateOneMenuItem(dto: MutateMenuItemDto, cafeId: string) {
    if (dto.id) {
      return await this.prismaService.menuItem.update({
        where: {
          id: dto.id,
        },
        data: {
          name: dto.name,
          description: dto.description,
          price: dto.price,
          type: dto.type,
        },
      });
    }

    return await this.prismaService.menuItem.create({
      data: {
        name: dto.name,
        description: dto.description ?? '',
        price: dto.price,
        type: dto.type,
        cafeId
      },
    });
  }

  async assignMenuItemToMenu(dto: MutateMenuAndItemRelationDto) {
    return await this.prismaService.menuEntry.create({
      data: {
        menuId: dto.menuId!,
        menuItemId: dto.menuItemId,
      },
    });
  }

  async removeMenuItemFromMenu(dto: MutateMenuAndItemRelationDto) {
    return await this.prismaService.menuEntry.delete({
      where: {
        menuId_menuItemId: {
          menuId: dto.menuId!,
          menuItemId: dto.menuItemId,
        },
      },
    });
  }
}
