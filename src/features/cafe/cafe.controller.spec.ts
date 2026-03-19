import { Test, TestingModule } from '@nestjs/testing';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';
import { beforeEach, describe, it } from 'node:test';

describe('CafeController', () => {
  let controller: CafeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CafeController],
      providers: [CafeService],
    }).compile();

    controller = module.get<CafeController>(CafeController);
  });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
  });
});
