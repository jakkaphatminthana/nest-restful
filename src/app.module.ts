import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AnonymousModule } from './anonymous/anonymous.module';
import { UserModule } from './user/user.module';
import { AuthGuard } from './config/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useClass: JwtConfig,
      global: true,
    }),
    AnonymousModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
