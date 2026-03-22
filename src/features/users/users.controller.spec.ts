import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CafeService } from '../cafe/cafe.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: CafeService,
          useValue: {
            getAllUserCafesForUserProfile: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
