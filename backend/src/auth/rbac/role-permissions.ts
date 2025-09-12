import { Role } from './roles.enum';
import { Permission } from './permissions.enum';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: [
    // All permissions
    ...Object.values(Permission),
  ],

  [Role.ADMIN]: [
    // User Management
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.DELETE_USER,
    Permission.MANAGE_USER_ROLES,
    
    // Program Management
    Permission.CREATE_PROGRAM,
    Permission.READ_PROGRAM,
    Permission.UPDATE_PROGRAM,
    Permission.DELETE_PROGRAM,
    Permission.MANAGE_PROGRAM_PARTICIPANTS,
    
    // Session Management
    Permission.CREATE_SESSION,
    Permission.READ_SESSION,
    Permission.UPDATE_SESSION,
    Permission.DELETE_SESSION,
    Permission.MANAGE_SESSION_ATTENDEES,
    
    // Goal Management
    Permission.CREATE_GOAL,
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    Permission.DELETE_GOAL,
    Permission.MANAGE_GOAL_PROGRESS,
    
    // Communication
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    Permission.DELETE_MESSAGE,
    Permission.MANAGE_CONVERSATIONS,
    
    // Reports & Analytics
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.VIEW_ANALYTICS,
    
    // System Administration
    Permission.MANAGE_SYSTEM_SETTINGS,
    Permission.VIEW_AUDIT_LOGS,
    
    // Matching System
    Permission.CREATE_MATCH,
    Permission.READ_MATCH,
    Permission.UPDATE_MATCH,
    Permission.DELETE_MATCH,
    Permission.MANAGE_MATCHING_ALGORITHM,
    
    // Feedback & Gamification
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
    Permission.UPDATE_FEEDBACK,
    Permission.MANAGE_GAMIFICATION,
    Permission.AWARD_BADGES,
  ],

  [Role.COORDINATOR]: [
    // User Management (limited)
    Permission.READ_USER,
    Permission.UPDATE_USER,
    
    // Program Management
    Permission.CREATE_PROGRAM,
    Permission.READ_PROGRAM,
    Permission.UPDATE_PROGRAM,
    Permission.MANAGE_PROGRAM_PARTICIPANTS,
    
    // Session Management
    Permission.CREATE_SESSION,
    Permission.READ_SESSION,
    Permission.UPDATE_SESSION,
    Permission.MANAGE_SESSION_ATTENDEES,
    
    // Goal Management
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    Permission.MANAGE_GOAL_PROGRESS,
    
    // Communication
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    Permission.MANAGE_CONVERSATIONS,
    
    // Reports & Analytics
    Permission.VIEW_REPORTS,
    Permission.VIEW_ANALYTICS,
    
    // Matching System
    Permission.CREATE_MATCH,
    Permission.READ_MATCH,
    Permission.UPDATE_MATCH,
    Permission.MANAGE_MATCHING_ALGORITHM,
    
    // Feedback & Gamification
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
    Permission.UPDATE_FEEDBACK,
    Permission.MANAGE_GAMIFICATION,
  ],

  [Role.FACULTY]: [
    // User Management (read only)
    Permission.READ_USER,
    
    // Program Management (limited)
    Permission.READ_PROGRAM,
    Permission.UPDATE_PROGRAM,
    
    // Session Management
    Permission.CREATE_SESSION,
    Permission.READ_SESSION,
    Permission.UPDATE_SESSION,
    
    // Goal Management
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    
    // Communication
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    
    // Reports & Analytics
    Permission.VIEW_REPORTS,
    
    // Matching System
    Permission.READ_MATCH,
    Permission.UPDATE_MATCH,
    
    // Feedback & Gamification
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
    Permission.UPDATE_FEEDBACK,
  ],

  [Role.MENTOR]: [
    // User Management (read only)
    Permission.READ_USER,
    
    // Program Management (read only)
    Permission.READ_PROGRAM,
    
    // Session Management (limited)
    Permission.CREATE_SESSION,
    Permission.READ_SESSION,
    Permission.UPDATE_SESSION,
    
    // Goal Management
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    Permission.MANAGE_GOAL_PROGRESS,
    
    // Communication
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    
    // Matching System
    Permission.READ_MATCH,
    Permission.UPDATE_MATCH,
    
    // Feedback & Gamification
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
    Permission.UPDATE_FEEDBACK,
  ],

  [Role.MENTEE]: [
    // User Management (own profile only)
    Permission.READ_USER,
    Permission.UPDATE_USER,
    
    // Program Management (read only)
    Permission.READ_PROGRAM,
    
    // Session Management (read only)
    Permission.READ_SESSION,
    
    // Goal Management (own goals only)
    Permission.CREATE_GOAL,
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    
    // Communication
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    
    // Matching System (read only)
    Permission.READ_MATCH,
    
    // Feedback & Gamification
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
  ],

  [Role.STUDENT]: [
    // User Management (own profile only)
    Permission.READ_USER,
    Permission.UPDATE_USER,
    
    // Program Management (read only)
    Permission.READ_PROGRAM,
    
    // Session Management (read only)
    Permission.READ_SESSION,
    
    // Goal Management (own goals only)
    Permission.CREATE_GOAL,
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    
    // Communication
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    
    // Matching System (read only)
    Permission.READ_MATCH,
    
    // Feedback & Gamification
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
  ],
};

// Helper function to check if a role has a specific permission
export const hasPermission = (role: Role, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
};

// Helper function to get all permissions for a role
export const getRolePermissions = (role: Role): Permission[] => {
  return ROLE_PERMISSIONS[role] ?? [];
};
