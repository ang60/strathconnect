import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { CreateUserRequest } from '../users/dto/create-user.request';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserRequest, response: Response) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create the user
    const user = await this.usersService.create(createUserDto);

    // Log the user in after registration
    return await this.login(user, response);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async verifyUserRefreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return user;
  }

  async login(user: any, response: Response, isGoogleLogin = false) {
    const payload = { email: user.email, sub: user._id };
    
    // Get JWT secrets with fallback defaults for development
    const jwtSecret = this.configService.get('JWT_SECRET') || 'dev-jwt-secret-change-in-production';
    const jwtRefreshSecret = this.configService.get('JWT_REFRESH_SECRET') || 'dev-jwt-refresh-secret-change-in-production';
    
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtRefreshSecret,
      expiresIn: '7d',
    });

    // Save refresh token to user
    await this.usersService.updateRefreshToken(user._id, refreshToken);

    // Set cookies
    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department,
      },
      accessToken,
    };
  }

  async logout(userId: string | null, response: Response) {
    // Clear refresh token if user ID is provided
    if (userId) {
      await this.usersService.updateRefreshToken(userId, null);
    }

    // Clear cookies regardless of user ID
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');

    return { message: 'Logged out successfully' };
  }
}
