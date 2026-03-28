import { PrismaService } from '@/lib/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  CreateCafeFloorDto,
  GetCafeFloorsDto,
  UpdateCafeFloorDto,
} from './types/dtos';

@Injectable()
export class FloorService {
  constructor(private prismaService: PrismaService) {}

  async getFloorsByCafeId(getCafeFloorsDto: GetCafeFloorsDto) {
    return await this.prismaService.cafeFloor.findMany({
      where: {
        cafeId: getCafeFloorsDto.cafeId,
      },
    });
  }

  async createCafeFloor(
    cafeId: string,
    createCafeFloorDto: CreateCafeFloorDto,
  ) {
    return await this.prismaService.cafeFloor.create({
      data: {
        cafeId,
        name: createCafeFloorDto.cafeFloorName,
      },
    });
  }

  async deleteCafeFloorByFloorId(cafeId: string, floorId: string) {
    return await this.prismaService.cafeFloor.delete({
      where: {
        cafeId,
        id: floorId,
      },
    });
  }

  async updateCafeFloorByIdAndCafeId(updateCafeFloorDto: UpdateCafeFloorDto) {
    return await this.prismaService.cafeFloor.update({
      where: {
        cafeId: updateCafeFloorDto.cafeId,
        id: updateCafeFloorDto.cafeFloorId,
      },
      data: {
        name: updateCafeFloorDto.cafeFloorName,
      },
    });
  }
}
