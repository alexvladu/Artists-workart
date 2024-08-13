import { Module } from '@nestjs/common';
import { UserService } from './serivce/user/user.service';
import { UserController } from './controller/user/user.controller';
@Module({
  providers: [UserService],
  controllers:[UserController]
})
export class UserModule {}
