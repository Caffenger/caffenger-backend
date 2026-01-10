import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { PrismaModule } from 'src/lib/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, LoginService, RegisterService],
  controllers: [],
})
export class AuthModule {}
