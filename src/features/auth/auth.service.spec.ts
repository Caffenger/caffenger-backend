import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        // Mock every service injected into AuthService's constructor
        { provide: UsersService, useValue: { findOne: jest.fn() } },
        { provide: JwtService, useValue: { sign: jest.fn() } },
        { provide: LoginService, useValue: { login: jest.fn() } },
        { provide: RegisterService, useValue: { register: jest.fn() } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
