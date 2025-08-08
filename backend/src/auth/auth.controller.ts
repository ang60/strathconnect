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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.register(createUserDto, response);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user, response);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.logout(user._id.toString(), response);
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
  @UseGuards(GoogleAuthGuard)
  loginGoogle() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallBack(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user, response, true);
  }
}
