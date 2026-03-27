import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/lib/prisma/prisma.service';
import { MutateMenuAndItemRelationDto, MutateMenuItemDto } from './dtos/dto';

@Injectable()
export class MenuItemService {
  constructor(private prismaService: PrismaService) {}

  async getManyByMenuId(menuId: string) {
    return await this.prismaService.menuItem.findMany({
      where: {
        menu: {
          id: menuId,
        },
      },
    });
  }

  async mutateOneMenuItem(dto: MutateMenuItemDto) {
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
      },
    });
  }

  async mutateMenuAndMenuItemRelationship(dto: MutateMenuAndItemRelationDto) {
    if (dto.menuId)
      return await this.prismaService.menuItem.update({
        where: {
          id: dto.menuItemId,
        },
        data: { menuId: dto.menuId },
      });

    return await this.prismaService.menuItem.update({
      where: {
        id: dto.menuItemId,
      },
      data: { menuId: null },
    });
  }
}
