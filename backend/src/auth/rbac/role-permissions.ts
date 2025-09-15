import { Role } from './roles.enum';
import { Permission } from './permissions.enum';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: [
    // All permissions
    ...Object.values(Permission),
  ],

  [Role.ADMIN]: [
    // User Oversight (Read-only + Policy Enforcement)
    Permission.READ_USER,
    Permission.SUSPEND_USER,
    Permission.REACTIVATE_USER,
    Permission.EXPORT_USER_DATA,
    
    // Program Oversight (Read-only)
    Permission.READ_PROGRAM,
    
    // Session Oversight (Read-only)
    Permission.READ_SESSION,
    
    // Goal Oversight (Read-only)
    Permission.READ_GOAL,
    
    // Communication Oversight (Read-only + Moderation)
    Permission.READ_MESSAGE,
    Permission.VIEW_ALL_CONVERSATIONS,
    Permission.MODERATE_CONTENT,
    
    // Reports & Analytics (Full Access)
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.VIEW_ANALYTICS,
    
    // System Administration (Configuration Only)
    Permission.MANAGE_SYSTEM_SETTINGS,
    Permission.VIEW_AUDIT_LOGS,
    Permission.MANAGE_DEPARTMENTS,
    Permission.MANAGE_CATEGORIES,
    Permission.CONFIGURE_OAUTH,
    Permission.ENFORCE_SECURITY_POLICIES,
    Permission.VIEW_SYSTEM_HEALTH,
    Permission.MANAGE_LANDING_CONTENT,
    Permission.MANAGE_ANNOUNCEMENTS,
    
    // Matching System Oversight (Read-only)
    Permission.READ_MATCH,
    
    // Feedback Oversight (Read-only)
    Permission.READ_FEEDBACK,
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
    
    // Program Management (limited)
    Permission.READ_PROGRAM,
    Permission.JOIN_ELIGIBLE_PROGRAMS,
    
    // Session Management
    Permission.CREATE_SESSION,
    Permission.READ_SESSION,
    Permission.UPDATE_SESSION,
    Permission.CONFIRM_SESSIONS,
    
    // Goal Management
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    Permission.MANAGE_GOAL_PROGRESS,
    Permission.TRACK_MENTEE_PROGRESS,
    
    // Communication
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    
    // Reports & Analytics (mentee progress only)
    Permission.VIEW_REPORTS,
    Permission.VIEW_PERSONAL_ANALYTICS,
    
    // Matching System
    Permission.READ_MATCH,
    Permission.UPDATE_MATCH,
    Permission.APPROVE_MENTORSHIP_REQUESTS,
    Permission.REJECT_MENTORSHIP_REQUESTS,
    
    // Feedback & Gamification
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
    Permission.UPDATE_FEEDBACK,
    Permission.PROVIDE_MENTOR_FEEDBACK,
  ],

  [Role.MENTEE]: [
    // User Management (own profile only)
    Permission.READ_USER,
    Permission.UPDATE_USER,
    
    // Program Management (limited)
    Permission.READ_PROGRAM,
    Permission.JOIN_ELIGIBLE_PROGRAMS,
    
    // Session Management (limited)
    Permission.READ_SESSION,
    Permission.BOOK_SESSIONS,
    
    // Goal Management (own goals only)
    Permission.CREATE_GOAL,
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    Permission.MANAGE_PERSONAL_GOALS,
    
    // Communication
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    
    // Reports & Analytics (personal only)
    Permission.VIEW_REPORTS,
    Permission.VIEW_PERSONAL_ANALYTICS,
    
    // Matching System
    Permission.READ_MATCH,
    Permission.REQUEST_MENTORSHIP,
    
    // Feedback & Gamification
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
    Permission.PROVIDE_MENTEE_FEEDBACK,
  ],

  [Role.STUDENT]: [
    // User Management (own profile only)
    Permission.READ_USER,
    Permission.UPDATE_USER,
    
    // Program Management (limited)
    Permission.READ_PROGRAM,
    Permission.JOIN_ELIGIBLE_PROGRAMS,
    
    // Session Management (limited)
    Permission.READ_SESSION,
    Permission.BOOK_SESSIONS,
    
    // Goal Management (own goals only)
    Permission.CREATE_GOAL,
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    Permission.MANAGE_PERSONAL_GOALS,
    
    // Communication
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    
    // Reports & Analytics (personal only)
    Permission.VIEW_REPORTS,
    Permission.VIEW_PERSONAL_ANALYTICS,
    
    // Matching System
    Permission.READ_MATCH,
    Permission.REQUEST_MENTORSHIP,
    
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
