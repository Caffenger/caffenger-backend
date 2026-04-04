import { Controller } from '@nestjs/common';
import { CafeObjectService } from './cafe-object.service';

@Controller('cafe-object')
export class CafeObjectController {
  constructor(private readonly cafeObjectService: CafeObjectService) {}
}
