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
        (request: Request) => request.cookies?.Authentication,
      ]),
      secretOrKey: configService.get('JWT_SECRET') || 'dev-jwt-secret-change-in-production',
    });
  }
  async validate(payload: TokenPayload) {
    const user = await this.usersService.getUser({ _id: payload.userId });
    
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
