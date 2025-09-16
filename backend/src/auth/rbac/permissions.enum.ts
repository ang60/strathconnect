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
  REQUEST_COACHING = 'request_coaching',
  APPROVE_COACHING_REQUESTS = 'approve_coaching_requests',
  REJECT_COACHING_REQUESTS = 'reject_coaching_requests',
  BOOK_SESSIONS = 'book_sessions',
  CONFIRM_SESSIONS = 'confirm_sessions',
  PROVIDE_COACH_FEEDBACK = 'provide_coach_feedback',
  PROVIDE_COACHEE_FEEDBACK = 'provide_coachee_feedback',
  TRACK_COACHEE_PROGRESS = 'track_coachee_progress',
  VIEW_PERSONAL_ANALYTICS = 'view_personal_analytics',
  MANAGE_PERSONAL_GOALS = 'manage_personal_goals',
  JOIN_ELIGIBLE_PROGRAMS = 'join_eligible_programs',
}
