export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  COORDINATOR = 'coordinator',
  COACH = 'coach',
  COACHEE = 'coachee',
  FACULTY = 'faculty',
  STUDENT = 'student',
}

// Role hierarchy - higher roles inherit permissions from lower roles
export const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.SUPER_ADMIN]: 100,
  [Role.ADMIN]: 90,
  [Role.COORDINATOR]: 80,
  [Role.FACULTY]: 70,
  [Role.COACH]: 60,
  [Role.COACHEE]: 50,
  [Role.STUDENT]: 40,
};

// Check if role has higher or equal hierarchy level
export const hasRoleHierarchy = (userRole: Role, requiredRole: Role): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};
