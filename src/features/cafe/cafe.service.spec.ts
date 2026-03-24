import { Test, TestingModule } from '@nestjs/testing';
import { CafeService } from './cafe.service';
import { PrismaService } from '@/lib/prisma/prisma.service';

const mockPrismaService = {
  cafe: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
};

const mockCafe = {
  id: 'cafe-1',
  name: 'Test Cafe',
  ownerId: 'user-1',
  createdAt: new Date(),
  deletedAt: null,
};

const mockCafeWithRelations = {
  ...mockCafe,
  staff: [],
  floors: [],
  menus: [],
  bills: [],
};

describe('CafeService', () => {
  let service: CafeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CafeService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CafeService>(CafeService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ---

  describe('getCafe', () => {
    it('should return a cafe with relations when found', async () => {
      mockPrismaService.cafe.findUnique.mockResolvedValue(
        mockCafeWithRelations,
      );

      const result = await service.getCafe({ id: 'cafe-1' });

      expect(mockPrismaService.cafe.findUnique).toHaveBeenCalledWith({
        where: { id: 'cafe-1' },
        include: { staff: true, floors: true, menus: true, bills: true },
      });
      expect(result).toEqual(mockCafeWithRelations);
    });

    it('should return null when cafe is not found', async () => {
      mockPrismaService.cafe.findUnique.mockResolvedValue(null);

      const result = await service.getCafe({ id: 'nonexistent' });

      expect(result).toBeNull();
    });
  });

  // ---

  describe('getAllUserCafesForUserProfile', () => {
    it('should return all cafes for a user', async () => {
      mockPrismaService.cafe.findMany.mockResolvedValue([mockCafe]);

      const result = await service.getAllUserCafesForUserProfile('user-1');

      expect(mockPrismaService.cafe.findMany).toHaveBeenCalledWith({
        where: { ownerId: 'user-1' },
      });
      expect(result).toEqual([mockCafe]);
    });

    it('should return empty array when user has no cafes', async () => {
      mockPrismaService.cafe.findMany.mockResolvedValue([]);

      const result = await service.getAllUserCafesForUserProfile('user-1');

      expect(result).toEqual([]);
    });
  });

  // ---

  describe('getAllUserCafes', () => {
    it('should return all cafes with relations for a user', async () => {
      mockPrismaService.cafe.findMany.mockResolvedValue([
        mockCafeWithRelations,
      ]);

      const result = await service.getAllUserCafes('user-1');

      expect(mockPrismaService.cafe.findMany).toHaveBeenCalledWith({
        where: { ownerId: 'user-1' },
        include: { staff: true, floors: true, menus: true, bills: true },
      });
      expect(result).toEqual([mockCafeWithRelations]);
    });
  });

  // ---

  describe('deleteCafe', () => {
    it('should delete and return the deleted cafe', async () => {
      mockPrismaService.cafe.delete.mockResolvedValue(mockCafe);

      const result = await service.deleteCafe('cafe-1');

      expect(mockPrismaService.cafe.delete).toHaveBeenCalledWith({
        where: { id: 'cafe-1' },
      });
      expect(result).toEqual(mockCafe);
    });
  });

  // ---

  describe('softDeleteCafe', () => {
    it('should set deletedAt and return the updated cafe', async () => {
      const deletedAt = new Date();
      mockPrismaService.cafe.update.mockResolvedValue({
        ...mockCafe,
        deletedAt,
      });

      const result = await service.softDeleteCafe({ id: 'cafe-1' });

      expect(mockPrismaService.cafe.update).toHaveBeenCalledWith({
        where: { id: 'cafe-1' },
        data: { deletedAt: expect.any(Date) },
      });
      expect(result.deletedAt).not.toBeNull();
    });
  });
});
