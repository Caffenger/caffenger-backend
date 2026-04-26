import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/auth.types';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { PrismaService } from '@/lib/prisma/prisma.service';
import { comparePasswords, hashPassword } from '@/utils/bcrypt.utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) { }

  async performLogin(loginDto: LoginDto): Promise<{access_token: string}> {
    const { email, password } = loginDto;

    const userFound = await this.prismaService.user.findUnique({
      where: {
        email
      }
    })

    if (!userFound) throw new UnauthorizedException();

    if (!(await comparePasswords(password, userFound.password))) throw new UnauthorizedException();

    const token = await this.generateToken({
      sub: userFound.id,
      email: userFound.email,
      name: userFound.name,
    })
    return { access_token: token };
  }

  // The register service method issues a JWT to login the user upon succesful registration
  async performRegister(registerDto: RegisterDto): Promise<{access_token: string}> {
    const { email, name, password } = registerDto

    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: {
        email: email
      }
    })

    if (userAlreadyExists) throw new ConflictException();

    const hashedPassword = await hashPassword(password);

    const newUser = await this.prismaService.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    });

    const token = await this.generateToken({
      sub: newUser.id,
      email: newUser.email,
      name: newUser.name,
    })
    return { access_token: token };
  }


  async generateToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload, {
      issuer: 'Caffenger official'
    });
  }


}
