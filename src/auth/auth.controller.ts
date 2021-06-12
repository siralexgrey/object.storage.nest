import { Body, Controller, Post, Request } from '@nestjs/common';
import { User } from 'src/users/shemas/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() user: User) {
      return this.authService.login(user);
    }
}
