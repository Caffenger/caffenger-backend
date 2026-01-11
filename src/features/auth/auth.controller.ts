import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthenticationPayload } from './types/auth.payload.types';
import type { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(@Body() signUpPayload: AuthenticationPayload) {
    const payload = await this.authService.register(
      signUpPayload.email,
      signUpPayload.password,
    );

    //redirect to login page if successful, or do it on the front
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-in')
  async signIn(@Body() signInPayload: AuthenticationPayload) {
    const payload = await this.authService.login(
      signInPayload.email,
      signInPayload.password,
    );

    return payload;
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async protectedRoute(@Res() res: Response) {
    return res.json({
      message: 'hi',
    });
  }
}
