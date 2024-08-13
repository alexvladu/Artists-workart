import { Test, TestingModule } from '@nestjs/testing';
import { WorkArtController } from './workart.controller';
import { WorkArtService } from 'src/workart/service/workart/workart.service';
import { UserService } from 'src/user/serivce/user/user.service';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
describe('WorkArtController', () => {
  let controller: WorkArtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
            JwtModule.register({
              secret: 'testSecret',
              signOptions: { expiresIn: '60m' },
            }),
          ],
        providers:[WorkArtService, UserService, AuthService],
      controllers: [WorkArtController]
    }).compile();

    controller = module.get<WorkArtController>(WorkArtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
