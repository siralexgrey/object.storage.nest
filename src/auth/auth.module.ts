import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.startegy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '14d' },
      }),
    ],
  controllers: [
        AuthController, ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
