import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { PrismaModule } from '@/lib/prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LoginService, RegisterService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
