import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthenticationPayload } from './types/auth.payload.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(@Body() signUpPayload: AuthenticationPayload) {
    const payload = await this.authService.register(
      signUpPayload.email,
      signUpPayload.password,
      signUpPayload.name,
    );

    if (payload) {
      return await this.authService.login(
        signUpPayload.email,
        signUpPayload.password,
      );
    }
  }

  @Post('login')
  async signIn(@Body() signInPayload: AuthenticationPayload) {
    const payload = await this.authService.login(
      signInPayload.email,
      signInPayload.password,
    );

    return payload;
  }
}
