import { User } from '@/generated/prisma/client';
import { PrismaService } from '@/lib/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createOne(email: string, password: string): Promise<User | null> {
    const exists = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (exists) return null;

    return await this.prismaService.user.create({
      data: {
        email: email,
        password: password,
        createdAt: new Date(),
      },
    });
  }
}
