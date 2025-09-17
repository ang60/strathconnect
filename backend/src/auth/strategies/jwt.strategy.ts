import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../token-payload.interface';
import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // First try to get token from HTTP-only cookie
          if (request.cookies?.access_token) {
            return request.cookies.access_token;
          }
          // Fallback to Authorization header for compatibility
          const authHeader = request.headers.authorization;
          if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.substring(7);
          }
          return null;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET') || 'dev-jwt-secret-change-in-production',
    });
  }
  async validate(payload: any) {
    const user = await this.usersService.getUser({ _id: payload.sub });
    
    if (!user) {
      return null;
    }

    // Return user with role information for RBAC
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      department: user.department,
      status: user.status,
    };
  }
}
