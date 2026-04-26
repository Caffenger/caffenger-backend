import { PrismaService } from '@/lib/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetCafesForUserMinimalDto, OneCafeDto } from './dto/cafe.dto';
import { Cafe } from '@/generated/prisma/client';

@Injectable()
export class CafeService {
  constructor(private prismaService: PrismaService) {}

  // optimize and segment
  getCafe = async (cafe: OneCafeDto): Promise<Cafe | null> => {
    return await this.prismaService.cafe.findUnique({
      where: {
        id: cafe.id,
      },
      include: {
        staff: false,
        floors: false,
        menus: false,
        bills: false,
      },
    });
  };

  // to optimize, i prefer DTO rather than prisma select overhead
  getAllUserCafesForUserProfile = async (
    userId: string,
  ): Promise<GetCafesForUserMinimalDto[]> => {
    return await this.prismaService.cafe.findMany({
      where: {
        ownerId: userId,
      },
    });
  };

  getAllUserCafes = async (userId: string) => {
    return await this.prismaService.cafe.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        staff: false,
        floors: false,
        menus: false,
        bills: false,
      },
    });
  };

  createCafe = async (userId: string, cafeName: string) => {
    return await this.prismaService.cafe.create({
      data: {
        name: cafeName,
        ownerId: userId,
      },
    });
  };

  deleteCafe = async (id: string) => {
    return await this.prismaService.cafe.delete({
      where: {
        id,
      },
    });
  };

  softDeleteCafe = async (cafeData: OneCafeDto) => {
    return await this.prismaService.cafe.update({
      where: {
        id: cafeData.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  };
}
