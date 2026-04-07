import { PrismaService } from '@/lib/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CanvasService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCanvasByCanvasId(id: string) {
    return await this.prismaService.canvas.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllFloorCanvases(floorId: string) {
    return await this.prismaService.canvas.findMany({
      where: {
        cafeFloorId: floorId,
      },
    });
  }

  async createCanvasForFloor(
    height: number,
    width: number,
    cafeFloorId: string,
  ) {
    return await this.prismaService.canvas.create({
      data: {
        height,
        width,
        cafeFloorId,
      },
    });
  }

  async deleteCanvas(canvasId: string) {
    return await this.prismaService.canvas.delete({
      where: {
        id: canvasId,
      },
    });
  }

  async updateCanvasSize(height: number, width: number, canvasId: string) {
    return await this.prismaService.canvas.update({
      where: {
        id: canvasId,
      },
      data: {
        height,
        width,
      },
    });
  }
}
