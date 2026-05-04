import { Injectable } from '@nestjs/common';
import { CreateMenuDto, UpdateMenuDto } from './dtos/dto';
import { PrismaService } from '@/lib/prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prismaService: PrismaService) {}


  async getOneById(id: string){
    return await this.prismaService.menu.findUnique({
      where: {
        id
      }
    })
  }

  async getMenusOfCafeByCafeId(cafeId: string) {
    return await this.prismaService.menu.findMany({
      where: {
        cafeId,
      },
    });
  }

  async createMenu(cafeId: string, createMenuDto: CreateMenuDto) {
    return await this.prismaService.menu.create({
      data: {
        name: createMenuDto.name,
        cafeId,
      },
    });
  }

  async updateOneMenu(menuId: string, updateMenuDto: UpdateMenuDto) {
    return await this.prismaService.menu.update({
      where: {
        id: menuId,
      },
      data: {
        name: updateMenuDto.name,
      },
    });
  }

  async deleteMenu(menuId: string) {
    return await this.prismaService.menu.delete({
      where: {
        id: menuId,
      },
    });
  }
}
