import { Module } from '@nestjs/common';
import { CafeObjectService } from './cafe-object.service';
import { CafeObjectController } from './cafe-object.controller';

@Module({
  controllers: [CafeObjectController],
  providers: [CafeObjectService],
})
export class CafeObjectModule {}
