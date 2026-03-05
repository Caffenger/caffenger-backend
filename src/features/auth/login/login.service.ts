import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/lib/prisma/prisma.service';

@Injectable()
export class LoginService {
  constructor(private prismaService: PrismaService) {}
}
