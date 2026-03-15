import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            performRegister: jest.fn().mockResolvedValue({ access_token: 'token' }),
            performLogin: jest.fn().mockResolvedValue({ access_token: 'token' }),
          },
        },
        { provide: UsersService, useValue: { getUserDataByIdForMeEndpoint: jest.fn() } },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should call performRegister on register', async () => {
    const dto = { email: 'a@a.com', name: 'A', password: 'password' };
    await controller.register(dto);
    expect(authService.performRegister).toHaveBeenCalledWith(dto);
  });

  it('should return user data on me route', async () => {
    const mockReq = { user: { userId: '123' } };
    await controller.me(mockReq);
    expect(mockReq.user.userId).toBe('123');
  });
});