import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../rbac/permissions.enum';
import { PERMISSIONS_KEY } from '../rbac/decorators/permissions.decorator';
import { hasPermission } from '../rbac/role-permissions';
import { Role } from '../rbac/roles.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const userRole = user.role as Role;
    
    // Check if user has all required permissions
    const hasAllPermissions = requiredPermissions.every((permission) =>
      hasPermission(userRole, permission),
    );

    if (!hasAllPermissions) {
      const missingPermissions = requiredPermissions.filter(
        (permission) => !hasPermission(userRole, permission),
      );
      
      throw new ForbiddenException(
        `Access denied. Missing permissions: ${missingPermissions.join(', ')}`,
      );
    }

    return true;
  }
}
