import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/serivce/user/user.service';
import { User } from 'src/User/user.dto';
describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    imports: [
        JwtModule.register({
            secret: 'testSecret',
            signOptions: { expiresIn: '1h' },
        }),
        ],
    providers:[AuthService, UserService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
