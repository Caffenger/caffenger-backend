import { Module } from '@nestjs/common';
import { FloorService } from './floor.service';
import { FloorController } from './floor.controller';
import { PrismaModule } from '@/lib/prisma/prisma.module';
import { CanvasModule } from '../canvas/canvas.module';

@Module({
  imports: [PrismaModule, CanvasModule],
  controllers: [FloorController],
  providers: [FloorService],
  exports: [FloorService],
})
export class FloorModule {}
