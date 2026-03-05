jest.mock('@/lib/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    user: { findUnique: jest.fn(), create: jest.fn() },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  })),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { PrismaService } from '@/lib/prisma/prisma.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
