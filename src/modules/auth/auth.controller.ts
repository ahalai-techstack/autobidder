import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() authPayload: RegisterUserDto) {
    return await this.authService.register(authPayload);
  }

  @Public()
  @HttpCode(200)
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  // @UseGuards(RolesGuard)
  @Get('profile')
  @Roles('admin', 'user')
  getProfile(@Request() req) {
    return req.user;
  }
}
