import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { PrismaModule } from '@/lib/prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { algorithm: 'HS256', expiresIn: '15MINUTES' },
    }),
  ],
  providers: [AuthService, LoginService, RegisterService],
  controllers: [AuthController],
})
export class AuthModule {}
