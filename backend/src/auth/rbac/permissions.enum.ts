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
}
