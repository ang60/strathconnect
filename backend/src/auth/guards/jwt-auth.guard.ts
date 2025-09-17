import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../rbac/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      // If there's a specific error, use it; otherwise provide a generic message
      if (err) {
        throw err;
      }
      // Check if the error is due to missing token vs invalid/expired token
      if (info && info.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid or expired token');
      } else if (info && info.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Invalid or expired token');
      } else {
        // No token provided or other authentication issues
        throw new UnauthorizedException('Unauthorized');
      }
    }
    return user;
  }
}