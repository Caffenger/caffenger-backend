import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthenticationPayload } from './types/auth.payload.types';

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

  @Post('sign-in')
  async signIn(@Body() signInPayload: AuthenticationPayload) {
    const payload = await this.authService.login(
      signInPayload.email,
      signInPayload.password,
    );

    return payload;
  }
}
