import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/lib/prisma/prisma.service';
import { SaveCanvasDto } from './types/dtos';

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

/*
- This service method represents the canvas snapshot backend implementation
- This method takes tempId's from the frontend canvas editing and properly assigns
generated cuid's to newly added objects

INCOMING ID RULES:
  - id and tempId --> update
  - id and no tempId --> delete
  - tempId and no id --> create
*/

  async saveCanvas(floorId: string, dto: SaveCanvasDto) {
    const canvas = await this.prismaService.canvas.findUnique({
      where: { cafeFloorId: floorId },
      select: { id: true },
    });

    if (!canvas) {
      throw new NotFoundException(`Canvas not found for floor ${floorId}`);
    }

    const canvasId = canvas.id;
    const incomingIds = dto.objects
      .filter((object) => !!object.id)
      .map((object) => object.id!);

    const [updated, created] = await this.prismaService.$transaction(
      async (tx) => {
        await tx.cafeObject.deleteMany({
          where: {
            canvasId,
            id: { notIn: incomingIds },
          },
        });

        const updateResults = await Promise.all(
          dto.objects
            .filter((object) => !!object.id)
            .map(async (object) => {
              const saved = await tx.cafeObject.update({
                where: { id: object.id! },
                data: {
                  pos_x_first: object.pos_x_first,
                  pos_y_first: object.pos_y_first,
                  pos_x_second: object.pos_x_second,
                  pos_y_second: object.pos_y_second,
                  objectType: object.objectType,
                  metadata: object.metadata ?? null,
                },
              });
              return { tempId: object.tempId, ...saved };
            }),
        );

        const createResults = await Promise.all(
          dto.objects
            .filter((object) => !object.id)
            .map(async (object) => {
              const saved = await tx.cafeObject.create({
                data: {
                  canvasId,
                  pos_x_first: object.pos_x_first,
                  pos_y_first: object.pos_y_first,
                  pos_x_second: object.pos_x_second,
                  pos_y_second: object.pos_y_second,
                  objectType: object.objectType,
                  metadata: object.metadata ?? null,
                },
              });
              return { tempId: object.tempId, ...saved };
            }),
        );

        return [updateResults, createResults] as const;
      },
    );

    return [...updated, ...created];
  }
}
