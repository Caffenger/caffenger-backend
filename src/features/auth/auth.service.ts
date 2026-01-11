import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords, hashPassword } from '@/utils/bcrypt.utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordIsValid = await comparePasswords(password, user.password);

    if (!passwordIsValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(email: string, password: string) {
    const emailExists = await this.usersService.findOne(email);

    if (emailExists) throw new ForbiddenException('Email already in use');

    const hashedPassword = await hashPassword(password);
    const newUser = await this.usersService.createOne(email, hashedPassword);

    if (!newUser)
      throw new InternalServerErrorException(
        'Error while registering new user, try again in a couple of minutes',
      );

    return newUser;
  }
}
