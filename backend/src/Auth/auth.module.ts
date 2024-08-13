import { Module } from '@nestjs/common';
import { AuthService } from './service/auth/auth.service';
import { AuthController } from './controller/auth/auth.controller';
import { UserService } from 'src/user/serivce/user/user.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [JwtModule.register({
          secret: 'dawdawdas',
          signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [AuthService, UserService],
    controllers: [AuthController]
})
export class AuthModule {}
