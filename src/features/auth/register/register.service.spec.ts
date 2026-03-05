jest.mock('@/lib/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    user: { findUnique: jest.fn(), create: jest.fn() },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  })),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { PrismaService } from '@/lib/prisma/prisma.service';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
