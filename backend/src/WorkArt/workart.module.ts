import { Module } from '@nestjs/common';
import { WorkArtService } from './service/workart/workart.service';
import { WorkArtController } from './controller/workart/workart.controller';
import { UserService } from 'src/user/serivce/user/user.service';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [JwtModule.register({
        secret: 'dawdawdas',
        signOptions: { expiresIn: '60m' },
      }),
  ],
  providers: [WorkArtService, UserService, AuthService],
  controllers:[WorkArtController],
})
export class WorkartModule {}
