import { PrismaService } from '@/lib/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CanvasService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCanvasByFloorId(id: string) {
    return await this.prismaService.canvas.findUnique({
      where: {
        cafeFloorId: id,
      },
      include: {
        objects: true,
      },
    });
  }

  async generateDefaultCanvasForNewlyCreatedFloor(cafeFloorId: string) {
    return await this.prismaService.canvas.create({
      data: {
        height: 10,
        width: 10,
        cafeFloorId,
      },
    });
  }

  async updateCanvasSize(height: number, width: number, floorId: string) {
    return await this.prismaService.canvas.update({
      where: {
        cafeFloorId: floorId,
      },
      data: {
        height,
        width,
      },
    });
  }
}
