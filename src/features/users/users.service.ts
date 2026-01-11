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
}
