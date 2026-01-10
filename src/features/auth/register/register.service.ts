import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/lib/prisma/prisma.service';

@Injectable()
export class RegisterService {
  constructor(private prismaService: PrismaService) {}
}
