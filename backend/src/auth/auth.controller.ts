import { Controller, Get, Post, Res, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from '../users/schema/user.schema';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserRequest } from '../users/dto/create-user.request';
import { Public } from './rbac/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  @Public()
  async register(
    @Body() createUserDto: CreateUserRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.register(createUserDto, response);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user, response);
  }

  @Post('logout')
  @Public()
  async logout(
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.logout(null, response);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user, response);
  }

  @Get('google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  loginGoogle() {}

  @Get('google/callback')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleCallBack(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user, response, true);
  }
}
