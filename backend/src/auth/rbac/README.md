# Role-Based Access Control (RBAC) System

This document describes the comprehensive RBAC system implemented for StrathConnect.

## Overview

The RBAC system provides fine-grained access control based on user roles and permissions. It ensures that users can only access resources and perform actions appropriate to their role in the system.

## Roles

### 1. Super Admin
- **Hierarchy Level**: 100 (Highest)
- **Description**: Full system access with all permissions
- **Permissions**: All permissions in the system

### 2. Admin
- **Hierarchy Level**: 90
- **Description**: Administrative access to manage users, programs, and system settings
- **Key Permissions**:
  - User management (create, read, update, delete)
  - Program management
  - Session management
  - Reports and analytics
  - System settings

### 3. Coordinator
- **Hierarchy Level**: 80
- **Description**: Program coordination and management
- **Key Permissions**:
  - Program management (limited)
  - Session management
  - User management (limited)
  - Reports viewing
  - Matching algorithm management

### 4. Faculty
- **Hierarchy Level**: 70
- **Description**: Faculty members with teaching responsibilities
- **Key Permissions**:
  - Session management
  - Goal management
  - Communication
  - Limited program access

### 5. Mentor
- **Hierarchy Level**: 60
- **Description**: Mentors who guide mentees
- **Key Permissions**:
  - Session management (limited)
  - Goal management
  - Communication
  - Feedback management

### 6. Mentee
- **Hierarchy Level**: 50
- **Description**: Students being mentored
- **Key Permissions**:
  - Own goal management
  - Communication
  - Feedback creation
  - Session participation

### 7. Student
- **Hierarchy Level**: 40 (Lowest)
- **Description**: Regular students
- **Key Permissions**:
  - Own profile management
  - Communication
  - Session participation
  - Feedback creation

## Permissions

The system defines granular permissions across different modules:

### User Management
- `CREATE_USER`: Create new users
- `READ_USER`: View user information
- `UPDATE_USER`: Modify user details
- `DELETE_USER`: Remove users
- `MANAGE_USER_ROLES`: Assign/change user roles

### Program Management
- `CREATE_PROGRAM`: Create new programs
- `READ_PROGRAM`: View program information
- `UPDATE_PROGRAM`: Modify program details
- `DELETE_PROGRAM`: Remove programs
- `MANAGE_PROGRAM_PARTICIPANTS`: Add/remove participants

### Session Management
- `CREATE_SESSION`: Create new sessions
- `READ_SESSION`: View session information
- `UPDATE_SESSION`: Modify session details
- `DELETE_SESSION`: Remove sessions
- `MANAGE_SESSION_ATTENDEES`: Manage session participants

### Goal Management
- `CREATE_GOAL`: Create new goals
- `READ_GOAL`: View goal information
- `UPDATE_GOAL`: Modify goal details
- `DELETE_GOAL`: Remove goals
- `MANAGE_GOAL_PROGRESS`: Track and update progress

### Communication
- `SEND_MESSAGE`: Send messages
- `READ_MESSAGE`: View messages
- `DELETE_MESSAGE`: Remove messages
- `MANAGE_CONVERSATIONS`: Manage chat conversations

### Reports & Analytics
- `VIEW_REPORTS`: Access reports
- `EXPORT_REPORTS`: Export report data
- `VIEW_ANALYTICS`: Access analytics dashboard

### System Administration
- `MANAGE_SYSTEM_SETTINGS`: Configure system settings
- `MANAGE_ROLES`: Manage role assignments
- `MANAGE_PERMISSIONS`: Configure permissions
- `VIEW_AUDIT_LOGS`: Access audit logs

### Matching System
- `CREATE_MATCH`: Create mentor-mentee matches
- `READ_MATCH`: View matching information
- `UPDATE_MATCH`: Modify matches
- `DELETE_MATCH`: Remove matches
- `MANAGE_MATCHING_ALGORITHM`: Configure matching logic

### Feedback & Gamification
- `CREATE_FEEDBACK`: Submit feedback
- `READ_FEEDBACK`: View feedback
- `UPDATE_FEEDBACK`: Modify feedback
- `MANAGE_GAMIFICATION`: Configure gamification
- `AWARD_BADGES`: Award achievement badges

## Implementation

### Guards

1. **JwtAuthGuard**: Validates JWT tokens and extracts user information
2. **RolesGuard**: Checks if user has required roles
3. **PermissionsGuard**: Verifies user has required permissions

### Decorators

1. **@Public()**: Marks endpoints as publicly accessible
2. **@Roles(...roles)**: Specifies required roles for access
3. **@RequirePermissions(...permissions)**: Specifies required permissions

### Service

**RbacService**: Provides utility methods for role and permission checks:
- `hasPermission()`: Check specific permission
- `hasAnyPermission()`: Check multiple permissions (OR logic)
- `hasAllPermissions()`: Check multiple permissions (AND logic)
- `hasRole()`: Check role hierarchy
- `canAccessOwnResource()`: Resource ownership validation
- `canAssignRole()`: Role assignment validation

## Usage Examples

### Basic Role Protection
```typescript
@Get('admin-only')
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
getAdminData() {
  return { message: 'Admin only data' };
}
```

### Permission-Based Protection
```typescript
@Post('create-user')
@RequirePermissions(Permission.CREATE_USER)
createUser(@Body() userData: any) {
  return this.usersService.create(userData);
}
```

### Combined Protection
```typescript
@Delete('user/:id')
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@RequirePermissions(Permission.DELETE_USER)
deleteUser(@Param('id') id: string) {
  return this.usersService.delete(id);
}
```

### Public Endpoints
```typescript
@Get('public-info')
@Public()
getPublicInfo() {
  return { message: 'Publicly accessible' };
}
```

### Resource Ownership Check
```typescript
@Get('profile/:userId')
@RequirePermissions(Permission.READ_USER)
getProfile(@Param('userId') userId: string, @CurrentUser() user: any) {
  const canAccess = this.rbacService.canAccessOwnResource(
    user.role, 
    userId, 
    user.id
  );
  
  if (!canAccess) {
    throw new ForbiddenException('Access denied');
  }
  
  return this.usersService.getProfile(userId);
}
```

## Frontend Integration

The frontend sidebar automatically filters navigation items based on user roles:

```typescript
const getNavigation = (userRole: string) => {
  return baseNavigation.map(group => ({
    ...group,
    items: group.items.filter(item => 
      !item.roles || item.roles.includes(userRole?.toLowerCase())
    )
  })).filter(group => group.items.length > 0);
};
```

## Security Considerations

1. **Token Validation**: All protected endpoints validate JWT tokens
2. **Role Hierarchy**: Higher roles inherit permissions from lower roles
3. **Resource Ownership**: Users can only access their own resources unless they have elevated permissions
4. **Audit Trail**: All access attempts are logged for security monitoring
5. **Principle of Least Privilege**: Users receive minimum necessary permissions

## Error Handling

The system returns appropriate HTTP status codes:
- `401 Unauthorized`: Invalid or missing authentication
- `403 Forbidden`: Valid authentication but insufficient permissions
- `404 Not Found`: Resource doesn't exist or user can't access it

## Testing

Use the example controller (`rbac-example.controller.ts`) to test different role and permission combinations. The controller provides endpoints for:
- Public access
- Role-based access
- Permission-based access
- Resource ownership validation
- Complex permission combinations

## Best Practices

1. Always use the most restrictive permissions necessary
2. Implement resource ownership checks for sensitive data
3. Use role hierarchy to simplify permission management
4. Regularly audit user roles and permissions
5. Implement proper error handling and logging
6. Test all permission combinations thoroughly
