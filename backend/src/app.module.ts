import { Module } from '@nestjs/common';
import { WorkartModule } from './workart/workart.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    ServeStaticModule.forRoot({
        rootPath: './uploads',
        serveRoot: '/uploads', // Prefix pentru URL
      }),
    WorkartModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
