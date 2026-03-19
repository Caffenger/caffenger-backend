import { User } from '@/generated/prisma/client';
import { PrismaService } from '@/lib/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { MePayload } from '../auth/types/auth.types';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async getUserDataByIdForMeEndpoint(id: string): Promise<MePayload | null> {
    const meData = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!meData) throw new NotFoundException();

    return meData;
  }

  async createOne(
    email: string,
    name: string,
    password: string,
  ): Promise<User | null> {
    const exists = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (exists) return null;

    const newUserData: CreateUserDto = {
      email: email,
      name: name,
      password: password,
      createdAt: new Date(),
    };

    return await this.prismaService.user.create({
      data: newUserData,
    });
  }
}
