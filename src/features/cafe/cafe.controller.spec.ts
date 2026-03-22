import { Test, TestingModule } from '@nestjs/testing';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';

describe('CafeController', () => {
  let controller: CafeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CafeController],
      providers: [
        {
          provide: CafeService,
          useValue: {
            getAllUserCafes: jest.fn(),
            getCafe: jest.fn(),
            createCafe: jest.fn(),
            deleteCafe: jest.fn(),
            softDeleteCafe: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CafeController>(CafeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
