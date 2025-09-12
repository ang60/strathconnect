import { Controller, Get, Post, Put, Delete, UseGuards, Body, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { PermissionsGuard } from '../../guards/permissions.guard';
import { Roles } from '../decorators/roles.decorator';
import { RequirePermissions } from '../decorators/permissions.decorator';
import { Public } from '../decorators/public.decorator';
import { Role } from '../roles.enum';
import { Permission } from '../permissions.enum';
import { CurrentUser } from '../../current-user.decorator';
import { RbacService } from '../rbac.service';

@Controller('rbac-example')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class RbacExampleController {
  constructor(private readonly rbacService: RbacService) {}

  // Public endpoint - no authentication required
  @Get('public')
  @Public()
  getPublicData() {
    return { message: 'This is public data accessible to everyone' };
  }

  // Role-based access - only admins can access
  @Get('admin-only')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  getAdminData() {
    return { message: 'This data is only accessible to admins' };
  }

  // Permission-based access - requires specific permission
  @Get('user-management')
  @RequirePermissions(Permission.READ_USER)
  getUsers(@CurrentUser() user: any) {
    return { 
      message: 'User management data', 
      accessedBy: user.name,
      role: user.role 
    };
  }

  // Multiple permissions required - user must have ALL permissions
  @Post('create-user')
  @RequirePermissions(Permission.CREATE_USER, Permission.MANAGE_USER_ROLES)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  createUser(@Body() userData: any, @CurrentUser() user: any) {
    return { 
      message: 'User created successfully', 
      createdBy: user.name,
      userData 
    };
  }

  // Resource ownership check
  @Get('profile/:userId')
  @RequirePermissions(Permission.READ_USER)
  getUserProfile(@Param('userId') userId: string, @CurrentUser() user: any) {
    // Check if user can access this resource
    const canAccess = this.rbacService.canAccessOwnResource(
      user.role, 
      userId, 
      user.id
    );

    if (!canAccess) {
      return { 
        error: 'Access denied', 
        message: 'You can only access your own profile' 
      };
    }

    return { 
      message: 'Profile data', 
      userId,
      accessedBy: user.name 
    };
  }

  // Complex permission check with custom logic
  @Put('program/:programId/participants')
  @RequirePermissions(Permission.MANAGE_PROGRAM_PARTICIPANTS)
  manageProgramParticipants(
    @Param('programId') programId: string,
    @Body() participantData: any,
    @CurrentUser() user: any
  ) {
    return {
      message: 'Program participants updated',
      programId,
      participantData,
      updatedBy: user.name,
      role: user.role
    };
  }

  // Coordinator and above can access
  @Get('programs')
  @Roles(Role.COORDINATOR, Role.ADMIN, Role.SUPER_ADMIN)
  getPrograms(@CurrentUser() user: any) {
    return {
      message: 'Programs data',
      accessedBy: user.name,
      role: user.role,
      programs: [
        { id: 1, name: 'Leadership Program' },
        { id: 2, name: 'Mentorship Program' }
      ]
    };
  }

  // Mentor and mentee can access their sessions
  @Get('sessions')
  @Roles(Role.MENTOR, Role.MENTEE, Role.FACULTY, Role.ADMIN)
  @RequirePermissions(Permission.READ_SESSION)
  getSessions(@CurrentUser() user: any) {
    return {
      message: 'Sessions data',
      accessedBy: user.name,
      role: user.role,
      sessions: [
        { id: 1, title: 'Weekly Check-in' },
        { id: 2, title: 'Goal Setting Session' }
      ]
    };
  }

  // Delete operation - requires specific permission
  @Delete('user/:userId')
  @RequirePermissions(Permission.DELETE_USER)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  deleteUser(@Param('userId') userId: string, @CurrentUser() user: any) {
    return {
      message: 'User deleted successfully',
      deletedUserId: userId,
      deletedBy: user.name,
      role: user.role
    };
  }

  // Get user's effective permissions
  @Get('my-permissions')
  getMyPermissions(@CurrentUser() user: any) {
    const permissions = this.rbacService.getPermissions(user.role);
    const assignableRoles = this.rbacService.getAssignableRoles(user.role);

    return {
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      },
      permissions,
      assignableRoles,
      canAssignRoles: assignableRoles.length > 0
    };
  }
}
