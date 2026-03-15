import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/lib/prisma/prisma.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcryptUtils from '@/utils/bcrypt.utils';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;

  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedPassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mock-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService);
  });

  describe('performRegister', () => {
    it('should throw ConflictException if user already exists', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser as any);
      
      await expect(service.performRegister({
        email: 'test@example.com',
        name: 'Test',
        password: 'password123'
      })).rejects.toThrow(ConflictException);
    });

    it('should create a user and return an access token', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prisma.user, 'create').mockResolvedValue(mockUser as any);
      jest.spyOn(bcryptUtils, 'hashPassword').mockResolvedValue('hashedPassword' as never);

      const result = await service.performRegister({
        email: 'test@example.com',
        name: 'Test',
        password: 'password123'
      });

      expect(result).toEqual({ access_token: 'mock-token' });
      expect(prisma.user.create).toHaveBeenCalled();
    });
  });

  describe('performLogin', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

      await expect(service.performLogin({
        email: 'wrong@example.com',
        password: 'password123'
      })).rejects.toThrow(UnauthorizedException);
    });

    it('should return token if credentials are valid', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser as any);
      jest.spyOn(bcryptUtils, 'comparePasswords').mockResolvedValue(true as never);

      const result = await service.performLogin({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(result).toEqual({ access_token: 'mock-token' });
    });
  });
});