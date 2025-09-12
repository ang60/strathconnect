import { Injectable } from '@nestjs/common';
import { Role } from './roles.enum';
import { Permission } from './permissions.enum';
import { hasPermission, getRolePermissions } from './role-permissions';
import { hasRoleHierarchy } from './roles.enum';

@Injectable()
export class RbacService {
  /**
   * Check if a user has a specific permission
   */
  hasPermission(userRole: Role, permission: Permission): boolean {
    return hasPermission(userRole, permission);
  }

  /**
   * Check if a user has any of the specified permissions
   */
  hasAnyPermission(userRole: Role, permissions: Permission[]): boolean {
    return permissions.some(permission => hasPermission(userRole, permission));
  }

  /**
   * Check if a user has all of the specified permissions
   */
  hasAllPermissions(userRole: Role, permissions: Permission[]): boolean {
    return permissions.every(permission => hasPermission(userRole, permission));
  }

  /**
   * Check if a user has a specific role or higher in hierarchy
   */
  hasRole(userRole: Role, requiredRole: Role): boolean {
    return userRole === requiredRole || hasRoleHierarchy(userRole, requiredRole);
  }

  /**
   * Check if a user has any of the specified roles
   */
  hasAnyRole(userRole: Role, roles: Role[]): boolean {
    return roles.includes(userRole);
  }

  /**
   * Get all permissions for a role
   */
  getPermissions(userRole: Role): Permission[] {
    return getRolePermissions(userRole);
  }

  /**
   * Check if a user can access a resource based on ownership
   * This is useful for resources where users can only access their own data
   */
  canAccessOwnResource(userRole: Role, resourceOwnerId: string, userId: string): boolean {
    // Admins and coordinators can access any resource
    if (this.hasRole(userRole, Role.ADMIN) || this.hasRole(userRole, Role.COORDINATOR)) {
      return true;
    }

    // Other users can only access their own resources
    return resourceOwnerId === userId;
  }

  /**
   * Get user's effective permissions based on role and context
   */
  getEffectivePermissions(userRole: Role, userId?: string, resourceOwnerId?: string): Permission[] {
    const basePermissions = this.getPermissions(userRole);
    
    // If user is accessing their own resource, they might have additional permissions
    if (userId && resourceOwnerId && userId === resourceOwnerId) {
      // Users can always manage their own profile
      if (!basePermissions.includes(Permission.UPDATE_USER)) {
        basePermissions.push(Permission.UPDATE_USER);
      }
    }

    return basePermissions;
  }

  /**
   * Validate if a role assignment is valid (e.g., only admins can assign admin roles)
   */
  canAssignRole(assignerRole: Role, targetRole: Role): boolean {
    // Super admins can assign any role
    if (assignerRole === Role.SUPER_ADMIN) {
      return true;
    }

    // Admins can assign roles except super admin
    if (assignerRole === Role.ADMIN && targetRole !== Role.SUPER_ADMIN) {
      return true;
    }

    // Coordinators can assign mentor and mentee roles
    if (assignerRole === Role.COORDINATOR && 
        [Role.MENTOR, Role.MENTEE, Role.STUDENT].includes(targetRole)) {
      return true;
    }

    // Faculty can assign mentee and student roles
    if (assignerRole === Role.FACULTY && 
        [Role.MENTEE, Role.STUDENT].includes(targetRole)) {
      return true;
    }

    return false;
  }

  /**
   * Get allowed roles that a user can assign to others
   */
  getAssignableRoles(userRole: Role): Role[] {
    switch (userRole) {
      case Role.SUPER_ADMIN:
        return Object.values(Role);
      case Role.ADMIN:
        return Object.values(Role).filter(role => role !== Role.SUPER_ADMIN);
      case Role.COORDINATOR:
        return [Role.MENTOR, Role.MENTEE, Role.STUDENT];
      case Role.FACULTY:
        return [Role.MENTEE, Role.STUDENT];
      default:
        return [];
    }
  }
}
