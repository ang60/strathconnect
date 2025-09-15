// Frontend RBAC utilities for role and permission checking

export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  COORDINATOR = 'coordinator',
  MENTOR = 'mentor',
  MENTEE = 'mentee',
  FACULTY = 'faculty',
  STUDENT = 'student',
}

export enum Permission {
  // User Management
  CREATE_USER = 'create_user',
  READ_USER = 'read_user',
  UPDATE_USER = 'update_user',
  DELETE_USER = 'delete_user',
  MANAGE_USER_ROLES = 'manage_user_roles',
  
  // Program Management
  CREATE_PROGRAM = 'create_program',
  READ_PROGRAM = 'read_program',
  UPDATE_PROGRAM = 'update_program',
  DELETE_PROGRAM = 'delete_program',
  MANAGE_PROGRAM_PARTICIPANTS = 'manage_program_participants',
  
  // Session Management
  CREATE_SESSION = 'create_session',
  READ_SESSION = 'read_session',
  UPDATE_SESSION = 'update_session',
  DELETE_SESSION = 'delete_session',
  MANAGE_SESSION_ATTENDEES = 'manage_session_attendees',
  
  // Goal Management
  CREATE_GOAL = 'create_goal',
  READ_GOAL = 'read_goal',
  UPDATE_GOAL = 'update_goal',
  DELETE_GOAL = 'delete_goal',
  MANAGE_GOAL_PROGRESS = 'manage_goal_progress',
  
  // Communication
  SEND_MESSAGE = 'send_message',
  READ_MESSAGE = 'read_message',
  DELETE_MESSAGE = 'delete_message',
  MANAGE_CONVERSATIONS = 'manage_conversations',
  
  // Reports & Analytics
  VIEW_REPORTS = 'view_reports',
  EXPORT_REPORTS = 'export_reports',
  VIEW_ANALYTICS = 'view_analytics',
  
  // System Administration
  MANAGE_SYSTEM_SETTINGS = 'manage_system_settings',
  MANAGE_ROLES = 'manage_roles',
  MANAGE_PERMISSIONS = 'manage_permissions',
  VIEW_AUDIT_LOGS = 'view_audit_logs',
  
  // Matching System
  CREATE_MATCH = 'create_match',
  READ_MATCH = 'read_match',
  UPDATE_MATCH = 'update_match',
  DELETE_MATCH = 'delete_match',
  MANAGE_MATCHING_ALGORITHM = 'manage_matching_algorithm',
  
  // Feedback & Gamification
  CREATE_FEEDBACK = 'create_feedback',
  READ_FEEDBACK = 'read_feedback',
  UPDATE_FEEDBACK = 'update_feedback',
  MANAGE_GAMIFICATION = 'manage_gamification',
  AWARD_BADGES = 'award_badges',
  
  // Enhanced Admin Permissions
  SUSPEND_USER = 'suspend_user',
  REACTIVATE_USER = 'reactivate_user',
  VIEW_ALL_CONVERSATIONS = 'view_all_conversations',
  MODERATE_CONTENT = 'moderate_content',
  RESOLVE_DISPUTES = 'resolve_disputes',
  MANAGE_DEPARTMENTS = 'manage_departments',
  MANAGE_CATEGORIES = 'manage_categories',
  CONFIGURE_OAUTH = 'configure_oauth',
  MANAGE_API_KEYS = 'manage_api_keys',
  ENFORCE_SECURITY_POLICIES = 'enforce_security_policies',
  VIEW_SYSTEM_HEALTH = 'view_system_health',
  MANAGE_LANDING_CONTENT = 'manage_landing_content',
  MANAGE_ANNOUNCEMENTS = 'manage_announcements',
  EXPORT_USER_DATA = 'export_user_data',
  BULK_USER_OPERATIONS = 'bulk_user_operations',
  
  // Enhanced User Permissions
  REQUEST_MENTORSHIP = 'request_mentorship',
  APPROVE_MENTORSHIP_REQUESTS = 'approve_mentorship_requests',
  REJECT_MENTORSHIP_REQUESTS = 'reject_mentorship_requests',
  BOOK_SESSIONS = 'book_sessions',
  CONFIRM_SESSIONS = 'confirm_sessions',
  PROVIDE_MENTOR_FEEDBACK = 'provide_mentor_feedback',
  PROVIDE_MENTEE_FEEDBACK = 'provide_mentee_feedback',
  TRACK_MENTEE_PROGRESS = 'track_mentee_progress',
  VIEW_PERSONAL_ANALYTICS = 'view_personal_analytics',
  MANAGE_PERSONAL_GOALS = 'manage_personal_goals',
  JOIN_ELIGIBLE_PROGRAMS = 'join_eligible_programs',
}

// Role hierarchy - higher roles inherit permissions from lower roles
export const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.SUPER_ADMIN]: 100,
  [Role.ADMIN]: 90,
  [Role.COORDINATOR]: 80,
  [Role.FACULTY]: 70,
  [Role.MENTOR]: 60,
  [Role.MENTEE]: 50,
  [Role.STUDENT]: 40,
};

// Role permissions mapping
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: Object.values(Permission),

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
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.CREATE_PROGRAM,
    Permission.READ_PROGRAM,
    Permission.UPDATE_PROGRAM,
    Permission.MANAGE_PROGRAM_PARTICIPANTS,
    Permission.CREATE_SESSION,
    Permission.READ_SESSION,
    Permission.UPDATE_SESSION,
    Permission.MANAGE_SESSION_ATTENDEES,
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    Permission.MANAGE_GOAL_PROGRESS,
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    Permission.MANAGE_CONVERSATIONS,
    Permission.VIEW_REPORTS,
    Permission.VIEW_ANALYTICS,
    Permission.CREATE_MATCH,
    Permission.READ_MATCH,
    Permission.UPDATE_MATCH,
    Permission.MANAGE_MATCHING_ALGORITHM,
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
    Permission.UPDATE_FEEDBACK,
    Permission.MANAGE_GAMIFICATION,
  ],

  [Role.FACULTY]: [
    Permission.READ_USER,
    Permission.READ_PROGRAM,
    Permission.UPDATE_PROGRAM,
    Permission.CREATE_SESSION,
    Permission.READ_SESSION,
    Permission.UPDATE_SESSION,
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    Permission.VIEW_REPORTS,
    Permission.READ_MATCH,
    Permission.UPDATE_MATCH,
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
    Permission.UPDATE_FEEDBACK,
  ],

  [Role.MENTOR]: [
    Permission.READ_USER,
    Permission.READ_PROGRAM,
    Permission.CREATE_SESSION,
    Permission.READ_SESSION,
    Permission.UPDATE_SESSION,
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    Permission.MANAGE_GOAL_PROGRESS,
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    Permission.READ_MATCH,
    Permission.UPDATE_MATCH,
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
    Permission.UPDATE_FEEDBACK,
  ],

  [Role.MENTEE]: [
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.READ_PROGRAM,
    Permission.READ_SESSION,
    Permission.CREATE_GOAL,
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    Permission.READ_MATCH,
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
  ],

  [Role.STUDENT]: [
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.READ_PROGRAM,
    Permission.READ_SESSION,
    Permission.CREATE_GOAL,
    Permission.READ_GOAL,
    Permission.UPDATE_GOAL,
    Permission.SEND_MESSAGE,
    Permission.READ_MESSAGE,
    Permission.READ_MATCH,
    Permission.CREATE_FEEDBACK,
    Permission.READ_FEEDBACK,
  ],
};

// Helper functions
export const hasRoleHierarchy = (userRole: Role, requiredRole: Role): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};

export const hasPermission = (role: Role, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
};

export const hasAnyPermission = (role: Role, permissions: Permission[]): boolean => {
  return permissions.some(permission => hasPermission(role, permission));
};

export const hasAllPermissions = (role: Role, permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(role, permission));
};

export const hasRole = (userRole: Role, requiredRole: Role): boolean => {
  return userRole === requiredRole || hasRoleHierarchy(userRole, requiredRole);
};

export const hasAnyRole = (userRole: Role, roles: Role[]): boolean => {
  return roles.includes(userRole);
};

export const getPermissions = (role: Role): Permission[] => {
  return ROLE_PERMISSIONS[role] ?? [];
};

export const canAccessOwnResource = (userRole: Role, resourceOwnerId: string, userId: string): boolean => {
  // Admins and coordinators can access any resource
  if (hasRole(userRole, Role.ADMIN) || hasRole(userRole, Role.COORDINATOR)) {
    return true;
  }

  // Other users can only access their own resources
  return resourceOwnerId === userId;
};

// Frontend-specific utilities
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  department?: string;
  status?: string;
}

export const checkUserPermission = (user: User | null, permission: Permission): boolean => {
  if (!user) return false;
  return hasPermission(user.role, permission);
};

export const checkUserRole = (user: User | null, role: Role): boolean => {
  if (!user) return false;
  return hasRole(user.role, role);
};

export const checkUserAnyRole = (user: User | null, roles: Role[]): boolean => {
  if (!user) return false;
  return hasAnyRole(user.role, roles);
};

export const checkUserAnyPermission = (user: User | null, permissions: Permission[]): boolean => {
  if (!user) return false;
  return hasAnyPermission(user.role, permissions);
};

export const checkUserAllPermissions = (user: User | null, permissions: Permission[]): boolean => {
  if (!user) return false;
  return hasAllPermissions(user.role, permissions);
};

// Component utilities for conditional rendering
export const withPermission = (user: User | null, permission: Permission, component: React.ReactNode) => {
  return checkUserPermission(user, permission) ? component : null;
};

export const withRole = (user: User | null, role: Role, component: React.ReactNode) => {
  return checkUserRole(user, role) ? component : null;
};

export const withAnyRole = (user: User | null, roles: Role[], component: React.ReactNode) => {
  return checkUserAnyRole(user, roles) ? component : null;
};

export const withAnyPermission = (user: User | null, permissions: Permission[], component: React.ReactNode) => {
  return checkUserAnyPermission(user, permissions) ? component : null;
};

export const withAllPermissions = (user: User | null, permissions: Permission[], component: React.ReactNode) => {
  return checkUserAllPermissions(user, permissions) ? component : null;
};
